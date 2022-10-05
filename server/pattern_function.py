#%%
import numpy as np
from typing import List



def generate_measurePattern(Measure_input, Complexity_input):

    # this function generates the pattern of 4 instruments according to some rules for a single measure

    Measure = int(Measure_input)
    Complexity = int(Complexity_input)

    if Complexity <= 30:
        quanto_mul = 2
    elif 30 < Complexity <= 60:
        quanto_mul = 4
    elif Complexity <= 100:
        quanto_mul = 8

    row_measure_dim = Measure * quanto_mul

    # ---------------------------------------#

    # KICK - SOUND1
    kick_measure_pattern = np.zeros((row_measure_dim))
    kick_measure_pattern = kick_measure_pattern.astype(int)
    kick_measure_pattern[quanto_mul :: int(Measure / 2)] = np.random.randint(
        2, size=len(kick_measure_pattern[quanto_mul :: int(Measure / 2)])
    )
    kick_measure_pattern[:: 2 * quanto_mul] = 1

    # SNARE - SOUND2
    snare_measure_pattern = np.zeros((row_measure_dim))
    snare_measure_pattern = snare_measure_pattern.astype(int)
    snare_measure_pattern[quanto_mul :: 2 * quanto_mul] += 1

    # HIHAT - SOUND3
    hh_measure_pattern = np.random.randint(2, size=row_measure_dim)

    # TOM - SOUND4
    tom_measure_pattern = np.zeros((row_measure_dim))
    tom_measure_pattern = tom_measure_pattern.astype(int)
    tom_measure_pattern[
        int(row_measure_dim / 4) :: int(quanto_mul / 2)
    ] = np.random.randint(
        2,
        size=len(tom_measure_pattern[int(row_measure_dim / 4) :: int(quanto_mul / 2)]),
    )

    #
    #
    # TOTALGRID
    measure_pattern = np.concatenate(
        (
            kick_measure_pattern,
            snare_measure_pattern,
            hh_measure_pattern,
            tom_measure_pattern,
        )
    )
    measure_pattern = measure_pattern.reshape(4, row_measure_dim)

    # -------------------------#

   
    return measure_pattern


def mix_generate_measurePattern(Measure_input, Complexity_input, APM_input):
   
    Measure = int(Measure_input)
    Complexity = int(Complexity_input)
    APM = int(APM_input)

    if Complexity <= 30:
        quanto_mul = 2
        row_measure_dim = Measure * quanto_mul
        result = getPattern(
            row_measure_dim=row_measure_dim,
            quanto_mul=quanto_mul,
            Measure=Measure,
            Complexity=Complexity,
            APM = APM,
            p=Complexity/110,
            p_force=1-Complexity/300,
        )
    elif 30 < Complexity <= 60:
        quanto_mul = 4
        row_measure_dim = Measure * quanto_mul
        result = getPattern(
            row_measure_dim=row_measure_dim,
            quanto_mul=quanto_mul,
            Measure=Measure,
            Complexity=Complexity,
            APM = APM,
            p=Complexity/150,
            p_force=1-Complexity/400,
        )
    elif Complexity <= 100:
        quanto_mul = 8
        row_measure_dim = Measure * quanto_mul
        result = getPattern(
            row_measure_dim=row_measure_dim,
            quanto_mul=quanto_mul,
            Measure=Measure,
            Complexity=Complexity,
            APM = APM,
            p=Complexity/220,
            p_force=1-Complexity/470
        )

    return result


def getPattern(row_measure_dim, quanto_mul, Measure, Complexity, APM, p=1, p_force=1):
    
    # KICK - SOUND1
    kick_measure_pattern = np.zeros((row_measure_dim))
    kick_measure_pattern = kick_measure_pattern.astype(int)

    if p<= 0.35:    #if case_kick < 1-p: 
        kick_measure_pattern[0]= 1
        kick_measure_pattern[quanto_mul :: int(Measure /2)] = np.random.choice(
            [0,1], p=[1-p,p], size = len(kick_measure_pattern[quanto_mul :: int(Measure / 2)]) )
        
    elif p >0.35:                    #if case_kick > 1-p:
        kick_measure_pattern[quanto_mul +1:: int(Measure /2)] = np.random.choice(
            [0,1], p=[1-p,p], size = len(kick_measure_pattern[quanto_mul+1 :: int(Measure / 2)]) )

        kick_measure_pattern[0]= np.random.choice([0,1], p=[1-(p_force/2),p_force/2])
       
        i = 1
        while i < len(kick_measure_pattern):

            if kick_measure_pattern[i-1]==1 & kick_measure_pattern[i-2]==1:     #no more than two consecutive 1
                kick_measure_pattern[i] = 0 

            k = 2 * quanto_mul * i                      #kick in battere
            if k < len(kick_measure_pattern):
                if np.random.uniform(0, 1) < p_force:
                    kick_measure_pattern[k] = 1 
            i += 1


    # SNARE - SOUND2
    snare_measure_pattern = np.zeros((row_measure_dim))
    snare_measure_pattern = snare_measure_pattern.astype(int)
    i = quanto_mul
    p_snare = np.random.uniform(0,1)

    if APM%2 == 0:
        if Complexity < 50:  
            snare_measure_pattern[quanto_mul :: 2 * quanto_mul] += 1
        elif Complexity >= 50:
            if p_snare < 0.5: 
                snare_measure_pattern[quanto_mul :: 2 * quanto_mul] += 1
            elif p_snare >= 0.5:
                snare_measure_pattern[quanto_mul+1 :: 2 * quanto_mul] += 1

    elif APM%2 != 0:
        if Complexity<70:
            snare_measure_pattern[quanto_mul :: 2 * quanto_mul] += 1
        elif Complexity >= 70:
            snare_measure_pattern[quanto_mul+1 :: 2 * quanto_mul] += 1

    while i < len(snare_measure_pattern): 
        if i%quanto_mul==0:
            
            if p_snare < p/2:
                if np.random.uniform(0, 1) < (1 - p_force)/1.5:  
                    snare_measure_pattern[i-int(quanto_mul/2)]=1
            if p_snare> p/2:
                if np.random.uniform(0, 1) < (1 - p_force)/2:  
                    snare_measure_pattern[i+int(quanto_mul/2)]=1
                if np.random.uniform(0, 1) < (1 - p_force)/2:  
                    snare_measure_pattern[i+int(quanto_mul/2)+1]=1
                if np.random.uniform(0, 1) < (1 - p_force)/2.5:  
                    if(i+int(quanto_mul/2)+2)<row_measure_dim:
                        snare_measure_pattern[i+int(quanto_mul/2)+2]=1
   
        i += quanto_mul

    # HH + BELL - SOUNDS 3 AND 4
    transitionMatrix = get_transition_matrix(Complexity, "hh_bell")
    hh_bell = MarkovModel(
        start_p=[1 / 3, 1 / 3, 1 / 3], transitionMatrix=transitionMatrix
    )
    hh_bell_pattern = hh_bell.sample_n(row_measure_dim)
    hh = [np.where(el == 1, 1, 0) for el in hh_bell_pattern]
    bell = [np.where(el == 2, 1, 0) for el in hh_bell_pattern]
    result = np.vstack([kick_measure_pattern, snare_measure_pattern, hh, bell])
    return result


# 	------------------------------------------------
# 			FUNCTIONS FOR MARKOV MODEL
# 	------------------------------------------------
def sample2pattern(kick_clap, hh_bell):
    print(kick_clap)
    print(hh_bell)
    kick = [np.where(el == 1, 1, 0) for el in kick_clap]
    clap = [np.where(el == 2, 1, 0) for el in kick_clap]
    hh = [np.where(el == 1, 1, 0) for el in hh_bell]
    bell = [np.where(el == 2, 1, 0) for el in hh_bell]
    print("\n\nkick ", kick)
    return np.vstack([kick, clap, hh, bell])


def get_transition_matrix(complexity, chain_name):
    if chain_name == "kick_clap":
        if complexity <= 30:
            return [
                #  a      b    c
                [0.01, 0.96, 0.03],  # a
                [0.1, 0.1, 0.8],  # b
                [0.1, 0.8, 0.1],  # c
            ]
        elif 30 < complexity <= 60:
            return [
                #  a      b    c
                [0.10, 0.80, 0.10],  # a
                [0.25, 0.25, 0.5],  # b
                [0.25, 0.5, 0.25],  # c
            ]
        elif complexity <= 100:
            return [
                #  a      b    c
                [0.20, 0.40, 0.40],  # a
                [0.3, 0.3, 0.4],  # b
                [0.3, 0.4, 0.3],  # c
            ]
    if chain_name == "hh_bell":
        if complexity <= 30:
            return [
                #  a      b    c
                [0.2, 0.4, 0.4],  # a
                [0.2, 0.4, 0.4],  # b
                [0.2, 0.4, 0.4],  # c
            ]
        elif 30 < complexity <= 60:
            return [
                #  a      b    c
                [0.10, 0.50, 0.40],  # a
                [0.2, 0.3, 0.5],  # b
                [0.25, 0.5, 0.25],  # c
            ]
        elif complexity <= 100:
            return [
                #  a      b    c
                [0.25, 0.40, 0.35],  # a
                [0.3, 0.3, 0.4],  # b
                [0.3, 0.4, 0.3],  # c
            ]


class MarkovModel:
    """
    Class MarkovModel: A markov model for the rythm generation
    """

    def __init__(self, start_p: List[float], transitionMatrix: List[float]):
        self.states = ["a", "b", "c"]
        self.state = np.random.choice(self.states, p=start_p)
        self.transitions = [["aa", "ab", "ac"], ["ba", "bb", "bc"], ["ca", "cb", "cc"]]
        print(self._valid(transitionMatrix))
        if transitionMatrix is not None:
            if self._valid(transitionMatrix):

                self.transitionMatrix = transitionMatrix
        else:
            print("Matrix is not Valid")
            self.transitionMatrix = [
                #  a      b    c
                [0.01, 0.96, 0.03],  # a
                [0.2, 0.2, 0.6],  # b
                [0.2, 0.6, 0.2],  # c
            ]

    def sample(self):
        i = self._idx_from_state()
        change = np.random.choice(self.states, replace=True, p=self.transitionMatrix[i])
        self.state = change
        return i

    def sample_n(self, n):
        return [self.sample() for i in range(n)]

    def _valid(self, matrix):
        return np.sum(matrix[0]) + np.sum(matrix[1]) + np.sum(matrix[2]) == 3

    def _idx_from_state(self):
        if self.state == "a":
            return 0
        elif self.state == "b":
            return 1
        else:
            return 2
