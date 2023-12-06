; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BACgAFPijUs2fADcGogIZIARinkhCFZhwnCU2EIJAhR4gFTrqveZeP5FKtdUJJYIFIRjUc244QBmtlAUAOZ0NM6wAJQGRrGxwoSWENZyCCjsETDRwml47p5ZMXHFwsyE4S4whsU1RjnyEJHVtSVI1rQAXDBQAI4cQQhQALQUTS01wg3JAJ4dbawKyqogtFJowubCQ8YIDRVRK2vRq%2FgokefN43VT8rMI2FzUQ9gBiw4g0AjGAHwfUF%2F1PIeLznC5XOIbcjaUFFGoPaigy51RJWGyA9SaaE7PY5dIYrQI6IARlBTRE%2BGwwQAhMYYFJZMYbtNGRAZiAAOwgIkAVhAAGYAAzZJkgACcIAALAKQAAmAVC0FAA

(let solve (lambda input (do 
  (let* iterate (lambda times dists out (if (length times) 
        (iterate (cdr times) (cdr dists) 
          (pi times
              (car)
              (math:sequence-n)
              (array:map (lambda hold (* (- (car times) hold) hold)))
              (array:count-of (lambda rec (> rec (car dists))))
              (* out))) 
        out)))
      (iterate (car input) (car (cdr input)) 1))))

(log! (solve (array (array 7 15 30) (array 9 40 200))))
