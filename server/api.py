
import soundfile as sf
from flask import Flask,jsonify,request
import librosa
from utilities.AudioProcessing import AudioProcessing


app=Flask(__name__)

@app.route("/measure",methods=['GET', 'POST'])
def get_measure():
    num2=request.json['beatsPerMeasure']
    print("Beats per Measure: ", num2)
    return '200'

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
    f.close()

    f =open('CPAC.wav', 'rb')
    #print(f.read())
    
    print('___________________________________________')
    print('___________________________________________')
    audio,sr=librosa.load(audio_loc)
    print(audio, sr)
    sp=AudioProcessing()
    trimmed_audio=sp.trim(audio)
    print(trimmed_audio)
    print('Received Audio from: ', id)
    return '200'