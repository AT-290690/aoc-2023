; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BACgAFPijUsAQyTMxggEQAGEAGYQANhABOEAEYATHoCsg3ao17luoyH27TVtbs13VygCxH5AShFiJzJIQMAyi0gBGKJIghBTMHBLCzIQxcQkgwjDUELEA5gBcMLKEEvIAOhQ%2BGUEQkgCe%2BUiSrGFIkdEAHhnJIF2Z2XmFxaUgVcIIklmFAxS5MAC0AHwUHG28MN6bW76i4iDNzFDcGfgRUeTpNRko2CCCIA%2BPwoQAZtUQtQ0w2EhQAPz7D4nM6dDIUbCJAC8vRAim2d0eiOut3uSMRuwkIQAju9PvkXth8GhUWj0TV6vkAF4sQF4YTkr5EBAMK5mXazOi0rYk0kPVrtfYgcK4im%2FCC5FkiuoZeYZCZ0hAoPDhTZyoJC7a%2BXno7na6rMQ7HekfUW8CUXRIMrneLBQLGbHl8hmNM0MbDpY2fa1ax7cjEgQIQahs05tc6xeKJG4I7opHkR9I8z2i5rAsOg%2BkGo5oYQ2jq6p7OglEtMC6LCx1Sl3iyWVp0m6XJhrFtDC%2FnncsZTDRJv5CUSYXzXRbWHw3M%2BvlNOiFVZTwiUTWCPx7QPUQzt6IJqMovk9eNpCRJ51NFqhgV9A7ZjJ5gv1vEt0sdoUxskN6vm6J1qVVh%2B96AAN3WBgVUfaJO2EWVe37Z84X2VU4RHcckynWgZyQOcF22Jcm1RJIgmDboghCKQZDEB1d3w9dA2ImBpFkKBuSAA%3D%3D
(let sample
"0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45")
(let parse (lambda input (pi input (string:split "\n") (array:map (lambda x (pi x (string:split " ") (cast:strings->numbers)))))))
(let append (lambda out arr (do 
      (if (array:some? arr (safety lambda x (not (= x 0)))) 
        (do 
          (let seq (array:fold 
            (array:zip arr (array:slice arr 1 (length arr)))
            (safety lambda a b (array:merge a (array (- (car (cdr b)) (car b)))))
            ()))
          (append (array:merge out (array arr)) seq))
      (array:merge out (array arr)))
    )))
    
(let part1 (lambda input (do 
  (pi 
    input 
    (array:map (lambda x (append () x)))
    (array:fold (lambda a b 
      (array:merge a 
        (array (array:fold b (safety lambda a b (+ a (array:get b -1))) 0)))) ())
    (math:summation)))))

(let part2 (lambda input (do 
  (pi 
    input 
    (array:map (lambda x (append () x)))
    (array:fold (lambda a b 
      (array:merge a 
        (array (array:fold (array:reverse b) (safety lambda a b (- (array:get b 0) a)) 0)))) ())
    (math:summation)))))

(assert
  (case "part 1 sample 114" (part1 (parse sample)) 114)
  (case "part 2 sample 2" (part2 (parse sample)) 2))
