import os

from flask import Flask, flash, redirect, render_template, request, session
from cs50 import SQL
from flask_session import Session
from datetime import datetime
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required, apology

#configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

#Configuring cs50 sqlite
db = SQL("sqlite:///timetable.db")

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#Index page
@app.route("/", methods=["POST", "GET"])
def index():
    if session.get("user_id") is None:
        return render_template("index.html")
    else:
        if request.method == "POST":

            """ Add task to the users database """
            task = request.form.get("task")
            time = request.form.get('time')

            db.execute("INSERT INTO tasks (task, time , user_id) values (?, ?, ?) ;", task , time, session.get('user_id'))

        table_value = db.execute("SELECT * FROM tasks WHERE user_id = ?;", session.get('user_id'))
        return render_template("main.html", tasks = table_value)

@app.route("/remove_task", methods=["POST", "GET"])
def remove_task():
    if request.method == "POST":
        task = request.form.get("task2")
        db.execute("DELETE FROM tasks WHERE task = ? AND user_id = ?", task, session.get('user_id'))
        return redirect('/')

#Registration of the user.
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        if not request.form.get("username"):
            return apology("Missing Username", 403)

        if not request.form.get("password"):
            return apology("Missing Password", 400)

        if not request.form.get("confirm"):
            return apology("Missing Confirm Password", 400)

        # Getting the information from the users.
        username = request.form.get("username")
        password = request.form.get("password")
        confirm = request.form.get("confirm")

        # Checking if password is confirmed
        if confirm != password:
            return apology("Password is not confirmed", 400)

        #Password Hashing
        hashed = generate_password_hash(password)

        #Checking uniqueness of the username.
        answer = db.execute("SELECT username FROM users WHERE username = ?", username)

        #Error message if the username exists.
        if len(answer) != 0:
            return apology("Username Already Exists", 400)
        else:
            #Inserting into the database
            db.execute("INSERT INTO users (username, hash) VALUES (?, ?);", username, hashed)

        #Selecting values for creating session
        value = db.execute("SELECT * FROM users WHERE username = ?;", username)
        #Making session
        session["user_id"] = value[0]["id"]

        return redirect("/")

    else:
        return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("Missing Username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("Missing Password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # storing username for flash.
        username = request.form.get("username")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")

@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()
    # Redirect user to login form
    return redirect("/login")

@app.route("/contact")
def contact():
    return render_template("contact.html")