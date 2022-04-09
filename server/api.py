
from urllib import response
from flask import Flask,jsonify,request, send_file

import librosa
import tempfile
import os
from urllib.request import urlopen
import soundfile as sf
from utilities.AudioProcessing import AudioProcessing


app=Flask(__name__)

bpm = 120
measure = 4
length = 4
complexity = 50


@app.route('/state', methods=['GET', 'POST'])
def State():
    global bpm
    bpm=request.json['BPM']
    global measure
    measure=request.json['beatsPerMeasure']
    global length
    length=request.json['length']
    global complexity
    complexity=request.json['complexity']
    #Need to save and continuously update these files and making them available always everywhere
    return "200"


@app.route("/audioBlob", methods=['GET', 'POST'])
def get_blobURL():

    audioBlob = request.data
    id = request.headers['id']

    f = tempfile.NamedTemporaryFile(delete=False)
    f.write(audioBlob)
    audio, sr = librosa.load(f.name)
    f.close()
    os.unlink(f.name)

    trimmed_audio, _= librosa.effects.trim(audio, top_db=30)
    
    #to store the audios, uncomment those lines
    #audio_loc = "audio%s.wav" % id
    #sf.write(audio_loc, trimmed_audio, sr)
    #audio_loc = "audio%sNoCut.wav" % id
    #sf.write(audio_loc, audio, sr)
    Blob=tempfile.NamedTemporaryFile(delete=False)
    Blob.write(trimmed_audio)
    Blob.close()

    print('Received Audio from: ', id)
    print('Audio trimmed!')
    data={'url': 'urlToTrimedFileSoThatFrontEndCanRetrieveIt'}

    return data #send_file(Blob.name)

