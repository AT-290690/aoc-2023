; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BAChBACnxRqIZgEMIMBmOlIARimkhCFZh0kjmhDVp0gRMahE0BzAFwxmRSQCIAOhUcBKE7IjSAntaRpVkUVNRAADxMUbBBBEBNxSW8TMwsKGzsHCJBHaxz3dziEiUMeSL0DIvjqmtrkqtrG%2BJEEWU8GptrTcytbe0InfNjOzpaUCHaRppa24amu1rNbHvSAWgA%2BCg4VXgLC5sTEWRR4CviOkfr56rGJueuZu4vR1N7MgZyAHw97%2BZFvPwBIIJJSqdSRZ7XP76X5QuHZSHwkbdNIZfqDDyIpHTAH%2BeTiBC6fCgsKRcIFLHYhbSJavdIwDZbHZyPZ7Ir%2FCA%2BXylKCRVoQE6stliEowJT2BQyOQMRwAYWOIAAjHkACyKkAqgAcIE1AGYdQA2JUAdhAnx1%2Bs1RpARt16sVppAAE4NdqAKy6wTygUgABMeUV%2Bt1vr9AAYlUaDerzVGQLrwwbtZqQw64yHfSqlU6vQrdXklX71R6QG6XSrMzGXcmbfrjSmjb77ZmlTmfSrVeqnSHjZbMwaXebSzrM8ajW6i9qSyXM3rW2g3XlNaa9X6G9rg2adevw8bw4qQ079b6Q9XdQa5za8naldrAyWjXXN8aR6bFeHfUG3TbTWelYqPIUIqSFK1DqiEYKGNokiUtClRUo0mhQTBcIclyQLBMSoTgiY%2FI4eMESsrC8HNLi1gAGbYPgaDgWE6jKFEMTIdiQEgOIZG6LhygUsRUwsRYli0Bxsh4XgXHcTxoyHCgHD0ahgIUVRID8YJIJYSAdEpBI1jSCgKAAITqSAYleJyfgmJ4IgWVZ5lshJkklIE1AIPQ8ChvsdmNHxUAAO4Koq7keTULEwAguCwCZXIgHu4mBTcpEUXgbFEiS6j8mgTGxZ53n0FQphabQNIAPwgNJ9FpRZ0REZl8JyXiEgGSFYXwI5znhSImC1dYliiqF0DNdITkuZ4%2FkBdVzGkfI1AGeo4btThwnSBZpHdZIjV9UpPnHLZY1UiI2VQLl6wRYCK1YL14UtUNSqTDtmWdZNDXnfA0C%2BT6GW3ShABUx3%2BKda3hS9W1%2BkKBRVXZi2jR5tVRaD728fyrKiPg2CWAZeiyKBWDiuIBRAA

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
                                (cast:strings->numbers))))))
  (array index cards)))))))
(let sample (parse "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"))
(let part1 (lambda input 
                      (pi 
                        input
                          (array:map (lambda x (car (cdr x)))) 
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