; To run this code go follow this link
; https://at-290690.github.io/fez/index.html?l=NwAgCgTgpgzjIGMC2ATEBqE8D2FEBsBLBAaxGwDsQAXACykVsIAdy86BXClKPYy%2BACgAFPijUQzAIYQYDUVKQAjFFJCEKzDhOExqEDQHMAXDGZEJGrRIBEAHQo2AlC5FiJ2AGae5O6gE9mBhspG0YZAFoEbB5XUXFJGWoARhAFZVV1TW005kIQQRAi4pLSstKrHMLymtq0mQgpf2MkKVZ0lTU9PGEUbAK6wdr4iQoOJFz86qGZme6B2cW64QQpPVN9IwiAPgRaSOieGCdppbOS4Qam0ygxBB18RU7wnoAeF%2FJvXxcT87%2FilZrajGPYHGKwHag2Q%2FU7%2FC6rdbdLbbMbKXhpaIUVbUKAUKQ4%2BoQRrNQwJVEgAAMTkJxOMpNG4xAEWSPxhcNKwladFM4y5hEorLcCRginMwWSUiUCAATIJmABHCAAZj0HAAHAA3ADuAA9BFJkkppQglSgACxQACsnkE%2BigSgA7Bw9uJnIIRHkFiKkGKFsJpLIoNTqv6kiy%2FfhsIYAIQuIA%3D

(let parse (lambda input (string:split input "\n")))
(let offset (type "a" char-code))
(let part1 (lambda input (pi 
                          input 
                          (array:map (lambda str (do 
                              (let num (pi 
                                        str 
                                        (cast:string->char-codes)
                                        (array:select (lambda char (< char offset)))
                                        (cast:char-codes->chars)))
                              (cast:string->number (concatenate (array:get num 0) (array:get num -1))))))
                          (math:summation))))
(let sample "1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet")

(pi 
  sample 
  (parse) 
  (part1) 
  (log!))