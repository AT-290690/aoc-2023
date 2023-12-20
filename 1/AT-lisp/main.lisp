; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BACgAFPijUQzAIYQYDUVKQAjFFJCEKzDhOExqEDQHMAXDGZEJGrRIBEAHQo2AlC5FiJ0iNQCMIBctV1TW0%2FZkIQQRAo6JjYuNirEMj4lNS%2FGQgpAE9jJClWfxU1PTxhFGwItKrU0XEQCg4kUPDk6ra2ksr27rThBCk9U30jAFoAPgRaGRGEbB4YJ1ae5ZjhDOzTKDEEHRgpADNxLJB8RSLGGT8AHgvS6izmBhspG1uZuagXVxWf6L6B6jGSbTWbzcbA2RfJa%2FOL%2FQYlUZjBrKXh%2BBEUExIXiGeTrHI4iTIkAABic6QgmXxdSJI28XyhMNiwjydFMjRZhEo9LcdT2SHMT28UiUCAATIJmABHCAAZj0HAAHAA3ADuAA9BFJvEpRQgZSgACxQACs%2B0E%2BigSgA7BxJuJnIIRAM5F5knCnp4JL4%2BQKQN4DaLXsIwlhFL7gzI5GSI146WT%2FaKXEA%3D%3D%3D

(let parse (lambda input (string:split input "\n")))
(let part1 (lambda input (pi 
                          input 
                          (array:map (lambda str (do 
                              (let num (pi 
                                        str 
                                        (cast:string->char-codes)
                                        (array:select (safety lambda char (< char (type "a" char-code))))
                                        (cast:char-codes->chars)))
                              (cast:string->number (string:merge (array:get num 0) (array:get num -1))))))
                          (math:summation))))
(let sample "1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet")

(assert
  (case "part 1 sample 142" (pi sample (parse) (part1)) 142))