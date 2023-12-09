; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BACgAFPijUsAQyTMxggEQAGEAGYQANhABOEAEYATHoCsg3ao17luoyH27TVtbs13VygCxH5AShFiJzJIQMAyi0gBGKJIghBTMHBLCzIQxcQkgwjDUELEA5gBcMLKEEvIAOhQ%2BGUEQkgCe%2BUiSrGFIkdEAHhnJIF2Z2XmFxaUgVcIIklmFAxS5MAC0AHwUHG28MN6bW76i4iDNzFDcGfgRUeTpNRko2CCCIA%2BPwoQAZtUQtQ0w2EhQAPz7D4nM6dDIUbCJAC8vRAim2d0eiOut3uSMRuwkIQAju9PvkXth8GhUWj0TV6vkAF4sQF4YTkr5EBAMK5mXazOi0rYk0kPVrtfYgcK4im%2FCC5FkiuoZeYZCZ0hAoPDhTZyoJC7a%2BXno7na6rMQ7HekfUW8CUXRIMrneLBQLGbHl8hmNM0MbDpY2fa1ax7cjEgQIQahs05tc6xeKJG4I7opHkR9I8z2i5rAsOg%2BkGo5oYQ2jq6p7OglEtMC6LCx1Sl3iyWVp0m6XJhrFtDC%2FnncsZTDRJv5CUSYXzXRbWHw3M%2BvlNOiFVZTwiUTWCPx7QPUQzt6IJqMovk9eNpCRJ51NFqhgV9A7ZjJ5gv1vEt0sdoUxskN6vm6J1qVVh%2B96AAN3WBgVUfaJO2EWVe37Z84X2VU4RHcckynWgZyQOcF22Jcm1RJIgmDboghCKQZDEB1d3w9dA2ImBpFkKBuSAA%3D%3D
(let sample1 
"RL

AAA=BBB,CCC
BBB=DDD,EEE
CCC=ZZZ,GGG
DDD=DDD,DDD
EEE=EEE,EEE
GGG=GGG,GGG
ZZZ=ZZZ,ZZZ")
(let parse (lambda input (do 
  (let split (string:split input "\n"))
  (let path (car split))
  (let list (cdr (cdr split)))
  
  (let dirs (pi path (cast:string->chars) (array:map (lambda x (string:equal? x "R")))))
  (let adj (pi list (array:map (lambda x (string:split x "=")))))
  
  (array 
    dirs 
    (array:fold adj (lambda object entry (do 
    (let key (car entry))
    (let value (car (cdr entry)))
    (map:set! object key (string:split value ","))))
    (array () () () ()))
    adj
    ))))

(let sample2 "LLR

AAA=BBB,BBB
BBB=AAA,ZZZ
ZZZ=ZZZ,ZZZ")

(let sample3 "LR

11A=11B,XXX
11B=XXX,11Z
11Z=11B,XXX
22A=22B,XXX
22B=22C,22C
22C=22Z,22Z
22Z=22B,22B
XXX=XXX,XXX")

(let part1 (lambda input (do 
  (let dirs (car input))
  (let adj (car (cdr input)))
  (let* move (lambda source target step (do 
    (let node (array:get (map:get adj source) (array:get dirs (mod step (length dirs)))))
    (if (string:equal? node target)
        step 
        (move node target (+ step 1))))))
  (+ (move "AAA" "ZZZ" 0) 1))))


(let part2 (lambda input (do 

  (let dirs (car input))
  (let adj (car (cdr input)))
  (let keys (car (cdr (cdr input))))
  
  (let* move (lambda source target step (do 
    (let node (array:get (map:get adj source) (array:get dirs (mod step (length dirs)))))
    (if (string:equal? (array:get (cast:string->chars node) -1) target)
        step 
        (move node target (+ step 1))))))

  (pi 
    keys
    (array:map car)
    (array:select (lambda source 
      (pi source 
          (cast:string->chars) 
          (array:get -1)
          (string:equal? "A"))))
    (array:map (lambda source (+ (move source "Z" 0) 1)))
    (array:fold math:least-common-divisor 1)))))

(assert
  (case "part 1 sample 1" (part1 (parse sample1)) 2) 
  (case "part 1 sample 2" (part1 (parse sample2)) 6)
  (case "part 2 sample 3" (part2 (parse sample3)) 6))