
from flask import Flask ,request, send_file

import librosa
import tempfile
import os
from urllib.request import urlopen
import soundfile as sf


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

@app.route("/audioBlob", methods=['GET', 'POST'])
def get_blobURL():

    audioBlob = request.data
    id = request.headers['id']

    f = tempfile.NamedTemporaryFile(delete=False)
    f.write(audioBlob)
    audio, sr = librosa.load(f.name)
    f.close()
    os.unlink(f.name)
    
    
    audio_loc = "tmp/audio.wav" #% id
    trimmed_audio, _= librosa.effects.trim(audio, top_db=30)
    sf.write(audio_loc, trimmed_audio, sr)
    
    """
    #TODO: delete audio after sending
    @app.after_request
    def clear_temp_files(response):
        audio_loc = "tmp/audio.wav" #% id
        os.remove(audio_loc)
        return response
    """
    

    print('Received Audio from: ', id)
    print('Audio trimmed!')
    return send_file(audio_loc, mimetype='audio/wav')
    