from turtle import end_fill
import numpy as np


Measure = 4#/4
Channels = 4
Length = 2
Complexity = 1




#---------------------------------#


quanto_mul = 4                       #sarebbe in quanto suddividere il quarter (1/4) per avere il quanto del beat, che così è 1/16
row_measure_dim = Measure*quanto_mul


#---------------------------------------#

#KICK - SOUND1
kick_measure_pattern = np.zeros( (row_measure_dim) )
kick_measure_pattern = kick_measure_pattern.astype(int)
kick_measure_pattern[quanto_mul::int(Measure/2)] = np.random.randint(2, size=len(kick_measure_pattern[quanto_mul::int(Measure/2)]))
kick_measure_pattern[::2*quanto_mul] = 1

#SNARE - SOUND2
snare_measure_pattern = np.zeros( (row_measure_dim) )
snare_measure_pattern = snare_measure_pattern.astype(int)
snare_measure_pattern[quanto_mul::2*quanto_mul] += 1 

#HIHAT - SOUND3
hh_measure_pattern = np.random.randint(2, size=row_measure_dim)

#TOM - SOUND4
tom_measure_pattern = np.zeros( (row_measure_dim) )
tom_measure_pattern = tom_measure_pattern.astype(int)
tom_measure_pattern[int(row_measure_dim/4)::int(quanto_mul/2)] = np.random.randint(2, size=len(tom_measure_pattern[int(row_measure_dim/4)::int(quanto_mul/2)]))



#TOTALGRID
measure_pattern = np.concatenate((kick_measure_pattern, snare_measure_pattern, hh_measure_pattern,tom_measure_pattern))
measure_pattern = measure_pattern.reshape(4,row_measure_dim)



#-------------------------#

print(measure_pattern)
