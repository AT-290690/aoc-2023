; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BAChBACnxRqIZgEMIMBmOlIARimkhCFZh0kjmhDVp0gRMahE0BzAFwxmRSQCIAOhUcBKE7IjSAntaRpVkUVNRAADxMUbBBBEBNxSW8TMwsKGzsHCJBHaxz3dziEiUMeSL0DIvjqmtrkqtrG%2BJEEWU8GptrTcytbe0InfNjOzpaUCHaRppa24amu1rNbHvSAWgA%2BCg4VXgLC5sTEWRR4CviOkfr56rGJueuZu4vR1N7MgZyAHw97%2BZFvPwBIIJJSqdSRZ7XP76X5QuHZSHwkbdNIZfqDDyIpHTAH%2BeTiBC6fCgsKRcIFLHYhbSJavdIwDZbHZyPZ7Ir%2FCA%2BXylKCRVoQE6stliEowJT2BQyOQMRwAYWOIAAjHkACyKkAqgAcIE1AGYdQA2JUAdhAnx1%2Bs1RpARt16sVppAAE4NdqAKy6wTygUgABMeUV%2Bt1vr9AAYlUaDerzVGQLrwwbtZqQw64yHfSqlU6vQrdXklX71R6QG6XSrMzGXcmbfrjSmjb77ZmlTmfSrVeqnSHjZbMwaXebSzrM8ajW6i9qSyXM3rW2g3XlNaa9X6G9rg2adevw8bw4qQ079b6Q9XdQa5za8naldrAyWjXXN8aR6bFeHfUG3TbTWelYqPIUIqSFK1DqiEYKGNokiUtClRUo0mhQTBcIclyQLBMSoTgiY%2FI4eMESsrC8HNLi1gAGbYPgaDgWE6jKFEMTIdiQEgOIZG6LhygUsRUwsRYli0Bxsh4XgXHcTxoyHCgHD0ahgIUVRID8YJIJYSAdEpBI1jSCgKAAITqSAYleJyfgmJ4IgWVZ5lshJkklIE1AIPQpwAG6yNYPBkSAobiXZXSHNAADuCoiO5ECeVA3mKn5%2Fk3KRFF4GxRIkuo%2FJoExcXTEF9BUKYWm0DSAD8IDSfR6UWdERFZUiYUefI1AGY5zmwCYmB1RFlgOdITkuZ4MX7DVxFyXiEgGeo4YiO1uHSBZ4XWF1kjBcctlDfBIg5VAeXrCY82LSAzV9UqkxrUNHW2GNSlQCFPqZad8IiAAVLtHn7ctAqeL6QoFNVdmzYNWUjT5P13bx%2FKssIYjYJYBl6LIoFYOK4gFEAA%3D%3D%3D

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
                                (array:select (safety lambda x x))
                                (cast:strings->numbers))))))
  (array index cards)))))))
(let sample "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11")
(let part1 (lambda input 
                      (pi 
                        input
                          (array:map (safety lambda x (car (cdr x)))) 
                          (array:fold (lambda a b (do 
                              (let left (car b))
                              (let right (car (cdr b)))
                              (let dub (array:fold right (lambda a b (set:add! a b)) (array () () () () ())))
                              (let matches (var:def 0))
                              (let reward (var:def 1))
                              (array:for left (lambda card 
                                              (when (set:has? dub card) (do 
                                                (var:set! matches (+ (var:get matches) 1))
                                                (array:set! a 0 (+ (car a) (var:get reward)))
                                                (when (> (var:get matches) 1) 
                                                          (var:set! reward 
                                                            (* (var:get reward) 2))))))) 
                              a))
                            (array 0)) 
                          (car))))

(assert
  (case "part 1 sample 13" (pi sample (parse) (part1)) 13))