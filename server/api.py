from flask import Flask,jsonify,request
import time
import numpy as np

app=Flask(__name__)

@app.route('/time')
def get_current_time():
    return { 'body': time.time()}

@app.route('/number')
def get_number():
    return { 'body': np.random.randint(0,10)}

@app.route("/post2num",methods=['GET', 'POST'])
def post():
    num1=request.json['shownum']
    num2=request.json['two']
    print(num1, " ", num2, "somma: ", num2+num1)
    return '200'

@app.route("/time_signature")
def ger_time_sig():
    ts=[7,4]
    ts=request.json['nums']
    return {'body': {'time_signature': ts, 'ids':[{'id': i} for i in range(ts[0])]}}
    