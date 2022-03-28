import librosa

class  AudioProcessing:
    
    def __init__(self):
        pass

    def trim(self,audio):
         trimmed,_= librosa.effects.trim(audio, top_db=40)
         return trimmed