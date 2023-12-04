; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BACgAFPijUQzAIYQYDUVKQAjFFJCEKzDhOHNC6zdpDCY1CBoDmALhjMiEgEQAdCg4CUxmRCkBPK0ilWBWVVEAAPYxRsEEEQYzEJL2NTcwprW3twkAcrbLc3WPjxAx4I3X1CuKrqmqTKmoa44QQZD3rGmpMzSxs7Qkc8mI6O5pQINuHG5tahyc6W0xtutIBaAD4KDmVefIKmhMQZFHhyuPbhurmq0fHZq%2Bnb85GUnoz%2B7IAfdzu54S9ffyBeKKFRqCJPK6%2FPQ%2FSGwrIQuHDLqpdJ9AbuBGIqb%2FPxyMQIHT4EGhCJhfKYrHzKSLF5pGDrTbbWS7FmskQHGCKOzyaSyBgOADCRxAAEZcgAWEUgcUADhAMoAzPKAGyigDsIA%2B8qVMtVIFVCqlIo1IAAnNK5QBWBWCIUQNAAJlyIqVCodIAdAAZRarlVKtX6QArvcq5TL3cag%2B6HeLRabbcKFblRR6pdaQJbzeLYwHzeH9Uq1RHVQ6jbHRQn7dKJVLTe61TrY8rzVrM%2FLY2rVZa03KMxnY4rK2hLbkZRrFR6S3K3Zr5dPvWrvSL3aalQ73fmFcqh%2FrcobRXKXRnVUXZ2qOxqRd6Ha7LfqNVvRSL3AVRMVedQpcFQQYtBIKVCFSUg0Gh%2FjCwFNDiVgAGbYPgaDfqEahKJE0QAZSb4SGI0E6C0eBKOSEGTJhIDmBYtC4TIxgIGMIAEYRREjAcKAcChfwQN4fiwfBpGEORhLEmoyHJOIVhSCgKAAIQgMh%2BSeBxvjGB4wjKapSm7OhWIkQE1AIPQ8CensjFTAc0AAO7CiKRnGZ0HIILgsDyZxIBLgxNnVOxnEwbgIDYQJIRqHhaCae5UxmfQVAmKJtDUgA%2FCALEoUFylROBoWIp5AJyNQ0kwPZ0DwDpemOcImCZX4FjFHlDmFVIun6R4VnWelGFQdl0lqN6pXUVRUjKVBlUSNVBWkVAFn2hpLUQcI4VQJFaxOQCg1YPljlFQ1ooTFNLXlTY4i5at8DmcKIXbXCwgAFSLRVVWHaN40oB4DqsnJp2wn1zU2eVLmvaFDwsuy2AWNJugyJ%2BWBcmI%2BRAA%3D%3D

(let parse (lambda input (pi input (string:split "\n") (array:map (lambda x (do 
  (let arr (string:split x ": "))
  (let index (pi 
                arr 
                (car) 
                (string:split " ") 
                (cdr) 
                (car) 
                (cast:string->number)))
  (let cards (pi  
              arr 
              (cdr) 
              (car) 
              (string:split "|") 
              (array:map (lambda x 
                              (pi 
                                x 
                                (string:split " ")
                                (array:select (lambda x x))
                                (cast:strings->numbers))))))))))))
(let sample (parse "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"))
(let part1 (lambda input 
                      (pi 
                        input 
                          (array:fold (lambda a b (do 
                              (let left (car b))
                              (let right (car (cdr b)))
                              (let dub (array:fold right (lambda a b (set:add! a b)) (array () () () () ())))
                              (let matches 0)
                              (let reward 1)
                              (let scores (array 0 1))
                              (array:for left (lambda card 
                                              (when (set:has? dub card) (do 
                                                (array:set! scores matches (+ (array:get scores matches) 1))
                                                (array:set! a 0 (+ (car a) (array:get scores reward)))
                                                (when (> (array:get scores matches) 1) 
                                                          (array:set! scores reward 
                                                            (* (array:get scores reward) 2))))))) 
                              a))
                            (array 0)) 
                          (car))))
(log! (part1 sample))