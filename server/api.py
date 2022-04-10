
from email.mime import audio
import re
from flask import Flask,jsonify,request
import numpy as np
from utilities.AudioProcessing import AudioProcessing
from pattern_function import generate_measurePattern


app=Flask(__name__)

@app.route("/measure",methods=['GET', 'POST'])
def get_measure():
    num2=request.json['beatsPerMeasure']
    print("Beats per Measure: ", num2)
    return '300'

@app.route("/bpm", methods=['GET', 'POST'])
def get_bpm():
    bpm=request.json['bpm']
    print('BPM: ', bpm)
    return '200'
    
@app.route("/length", methods=['GET', 'POST'])
def get_length():
    length=request.json['len']
    print('Length: ', length)
    return '200'

@app.route("/complexity", methods=['GET', 'POST'])
def get_complexity():
    complexity=request.json['complexity']
    print('Complexity: ', complexity)
    return '200'

@app.route("/audio", methods=['GET', 'POST'])
def get_audio():
    id=request.json['id']
    #audio=request.json['audio']
    print('___________________________________________')
    print(request.json)
    print('___________________________________________')
    #sp=AudioProcessing()
    #trimmed_audio=sp.trim(audio)
    print('Received Audio from: ', id)
    return '200'

@app.route("/audioBlob", methods=['GET', 'POST'])
def get_blobURL():

    audio = request.data
    id = request.headers['id']
    
    audio_loc = "audio%s.wav" % id
    f = open(audio_loc,'wb')
    f.write(audio)
    f.close
    
    print('___________________________________________')
    print('___________________________________________')
    #sp=AudioProcessing()
    #trimmed_audio=sp.trim(audio)
    print('Received Audio from: ', id)
    return '200'


@app.route("/generate", methods=['GET', 'POST'])
def get_generate():
    generate=request.data
    if 'generate' in locals():
        print('Generate: CLICKED')
    return '200' 

@app.route("/pattern2", methods =['GET', 'POST'])
def generate_pattern():
    measure = int(request.values.get('num2'))
    len = request.args.get('length')
    compl = int(request.args.get('complexity') or 20)

    # pattern = 
    # for x in range(len)
        # measure_pattern = generate_measurePattern(measure, compl)

    measure_pattern = generate_measurePattern(measure, compl)

    #-------------------------#

    print(measure_pattern)

    return '200'