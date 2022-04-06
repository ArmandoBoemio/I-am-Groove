import numpy as np
import api


BPM = 120
Measure2 = 4#/4
Maesure = api.get_measure
Channels = 4
Length = 2
Complexity = 1


quarter_sec = 60/BPM  #in seconds

#---------------------------------#


quanto_mul = 4                               #sarebbe in quanto suddividere il quarter (1/4) per avere il quanto del beat, che così è 1/16
row_measure_dim = Measure*quanto_mul

instrument_measure_emptyPattern = np.zeros( (row_measure_dim) )       
total_measure_emptyPattern = np.zeros( (Channels, row_measure_dim) )


#---------------------------------------#

#KICK
kick_measure_pattern = np.zeros( (row_measure_dim) )
kick_measure_pattern = kick_measure_pattern.astype(int)
kick_measure_pattern[0] = 1
random_kick_interv=int(row_measure_dim*3/quanto_mul)-int(row_measure_dim/quanto_mul)
kick_measure_pattern[int(row_measure_dim/quanto_mul):int(row_measure_dim*3/quanto_mul)] = np.random.randint(2, size=random_kick_interv)

#SNARE
snare_measure_pattern = np.zeros( (row_measure_dim) )
snare_measure_pattern = snare_measure_pattern.astype(int)
snare_measure_pattern[int(row_measure_dim/quanto_mul)] = 1
snare_measure_pattern[int(row_measure_dim*3/quanto_mul)] = 1

#HIHAT
hh_measure_pattern = np.random.randint(2, size=row_measure_dim)

#TOM
tom_measure_pattern = np.zeros( (row_measure_dim) )
tom_measure_pattern = tom_measure_pattern.astype(int)
random_tom_interv=int(row_measure_dim/quanto_mul)
tom_measure_pattern[int(row_measure_dim*3/quanto_mul):row_measure_dim] = np.random.randint(2, size=random_tom_interv)

#
#
#TOTALGRID
measure_pattern = np.concatenate((kick_measure_pattern, snare_measure_pattern, hh_measure_pattern,tom_measure_pattern))
measure_pattern = measure_pattern.reshape(4,16)



#-------------------------#

print(measure_pattern)
