from flask import Flask
import time
import numpy as np

app=Flask(__name__)

@app.route('/time')
def get_current_time():
    return { 'body': time.time()}

@app.route('/number')
def get_number():
    return { 'body': np.random.randint(0,10)}
