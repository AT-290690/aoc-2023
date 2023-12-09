(let sample
"0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45")
(let parse (lambda input (pi input (string:split "\n") (array:map (lambda x (pi x (string:split " ") (cast:strings->numbers)))))))
(let append (lambda out arr (do 
      (if (array:some? arr (lambda x (not (= x 0)))) 
        (do 
          (let seq (array:fold 
            (array:zip arr (array:slice arr 1 (length arr)))
            (lambda a b (array:merge a (array (- (car (cdr b)) (car b)))))
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
        (array (array:fold b (lambda a b (+ a (array:get b -1))) 0)))) ())
    (math:summation)))))

(let part2 (lambda input (do 
  (pi 
    input 
    (array:map (lambda x (append () x)))
    (array:fold (lambda a b 
      (array:merge a 
        (array (array:fold (array:reverse b) (lambda a b (- (array:get b 0) a)) 0)))) ())
    (math:summation)))))

(assert
  (case "part 1 sample 114" (part1 (parse sample)) 114)
  (case "part 2 sample 2" (part2 (parse sample)) 2))
