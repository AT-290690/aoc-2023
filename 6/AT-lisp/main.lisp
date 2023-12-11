; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BACgAFPijUs2fADcGogIZIARinkhCFZhwnDmhEMITy%2Bm7QEoQgkNZu279hweMR5ATwBcALxYGjeQygmWtRmoVaOEZFOEC4eSPKsCsqq6qY6KNiWUdk51qLiNIRIcn6pwWG5lRH5EiiEMDqlAUHmFVXttrr61EVQ4R0DNsLxdO4wUACOHFAUCFAAtBRm%2FYMDws5u7vGJ%2BIoqarRSaMIAVAbzhcUgh%2FgoFjd3batrGx4I2FzU89gAZga7yTU0AQBgAfCBgSA6g1QrCns9OiNaO5mBBsCgOAgQrCRPhsABzACEBhgUlk0ViFLcIAA7CAAIwAVhAAGYAAwWdYxakAThAABY2SAAExsjk4oA%3D%3D

(let solve (lambda input (pi (car input)
                             (array:zip (car (cdr input)))
                             (array:map (lambda input (do
                                      (let time (car input))
                                      (let dist (car (cdr input)))
                                      (pi time
                                          (math:sequence-n)
                                          (array:map (safety lambda hold (* (- time hold) hold)))
                                          (array:count-of (safety lambda rec (> rec dist)))))))
                             (math:product))))

(assert
  (case "part 1 sample" 
    (solve (array (array 7 15 30) (array 9 40 200))) 288))