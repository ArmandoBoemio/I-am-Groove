from flask import Flask, request, send_file

import librosa
import tempfile
import os
import soundfile as sf
from pattern_function import mix_generate_measurePattern



app = Flask(__name__)

bpm = 120
measure = 4
APM = 0
complexity = 50


@app.route("/state", methods=["GET", "POST"])
def State():
    global bpm
    bpm = request.json["BPM"]
    global measure
    measure = request.json["beatsPerMeasure"]
    global APM
    APM = request.json["APM"]
    global complexity
    complexity = request.json["complexity"]
    # Need to save and continuously update these files and making them available always everywhere
    print("bpm =", bpm)
    print("measure =", measure)
    print("APM =", APM)
    print("complexity =", complexity)

    return "200"


@app.route("/audioProcess", methods=["GET", "POST"])
def audioProcess():

    audioBlob = request.data
    id = request.headers["id"]
    f = tempfile.NamedTemporaryFile(delete=False)
    f.write(audioBlob)
    audio, sr = librosa.load(f.name)
    f.close()
    os.unlink(f.name)

    path = "../client/src/Components/sounds/userSounds"
    exists = os.path.exists(path)
    print(exists)
    if not exists:
        os.makedirs(path)

    audio_loc = "../client/src/Components/sounds/userSounds/userAudio_%s.wav" % id
    trimmed_audio, _ = librosa.effects.trim(audio, top_db=20)
    sf.write(audio_loc, trimmed_audio, sr)

    print("Received Audio from: ", id)
    print("Audio trimmed!")
    return send_file(audio_loc, mimetype="audio/wav")


@app.route("/pattern", methods=["GET", "POST"])
def generate_pattern():

    # measure_pattern = generate_measurePattern(measure, complexity)
    measure_pattern = mix_generate_measurePattern(measure, complexity, APM)

    print("Generated pattern: \n", measure_pattern)

    return {
        "Pattern_kick": str(measure_pattern[0]),
        "Pattern_snare": str(measure_pattern[1]),
        "Pattern_hh": str(measure_pattern[2]),
        "Pattern_tom": str(measure_pattern[3]),
    }

