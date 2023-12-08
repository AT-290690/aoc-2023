; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BACgAFPijUsAQyTMxARhCCARACUAMoMEBBHQF4AQoYA0AYTODD%2B3QBFbRgKKPBZk7oBaHowHEfg29Zs7f0FHe11QhycfL11o718PN3dPRKUAShExCWZJCBgGUWkAIxRJEEIKZg4JYRRsRRAQUXEsWUIamGoICoBzAC4YNokKqoklAB0KdIzG5uzJOiaEXNaiajSZpqyQIk6llDxhBAPV9o3NwVntlEI8puZCEBzFo8lOga7egFoAPgRaXIwNJNXIQSQATz6SEkrEKSBKZQAHk1Ot0KP0oABHDiSfAAfhAyNU03Oly2LUkKAAVvdHrsaqCIVCYVtiqVCSjPuiBkMOUpdCSNmSycJGeCGo0QDc7mTZmK%2BgAzbD4NCUmlwhHkIpUqAICRQChdcW1eqy8kSEhQY3LPAGo1CyXmkAAN1xHAKNv2tsNEHBpMdwmhzAG4gAhFqdXqQJbjajejy1i63QwlEZBWbRRAwcbgcJc%2FmHZK1WbzhlMi0YNJZFAAEwgJRqNQqTQ6LQGYyWCyGXStoyJQSJZJuPsedKaOZSGRiADM9abmjkcjbi%2F0RgAGhvBCvdBu10ZF24t3Ikiv15uazW2xfV7vBNfdBeTEZH3ea64L8OP6%2BktfnzX9IIu47huZ5rmO5bzBA1AKBq7IjNUTR1BKE7SvArx8JU1SFhOapLCsRwnPB6zYVkABUIBINgzoFPgbJlDA2AcBACAMNQuQ9BW1BQLCSEZtsFDYDwIJZkyHE1EGfRiSAuEMUxLG5vKUmoU0lFoJ03HkuiiyoaWmyzIQCqcmiGLYriBICUJbEQGJemOlgXGsGaAaUdRIAWax7EtMImDqawci6Zs3kqVRKatko9apCAAAMwL%2BaS47bDkUF1rBZREYhpoitctxoZ6REkRS1J4YcxwYaM%2FpOjGuX4aVXrlJhxGFll4jkS5NF0VgjHMR51mcRpJoSlcLTucJ2aSV5ElSTJXXyaNoktMpgaCfZ%2FViFptBSjlukZgZRnxliOL4nNkJSa87xxuivz%2FICbmCVAwJfP5NCeesTmSr5g12UtrkjVZp0%2BQ5IBxaWmizA8n1VRm8pBoguS2ZmY35GIUapZ1ckMG9wjg7J3WfXZeHnVyPRXQCeTAm9AaKS0j22fjwgXSZh0EkoWjppTImQjDqM4yxTSYN9DA8ymbjhTFQMVXKHOKsqaDQnQfRiG81BfAg2BIJRFBfDczqEAxeDA0KIpioNWO5NB9yAoLVbyIWFtQTBSX5JO1Y1rbpvJXbTuVlOUDTucQA%3D%3D%3D
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