package main

import (
	"fmt"
	"strings"

	utils "aoc-2023.bare7a.eu/internal"
)

func main() {
	trebuchet1(1)
	trebuchet2(2)
}

func trebuchet1(suffix int) {
	lines := utils.ReadInputLines(suffix)

	var sum int64 = 0
	for _, line := range lines {
		var numbersArr []int64

		for _, char := range line {
			number, ok := utils.RuneToInt64(char)
			if ok {
				numbersArr = append(numbersArr, number)
				continue
			}
		}

		number := getNumber(numbersArr)
		sum = sum + number
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}

func trebuchet2(suffix int) {
	lines := utils.ReadInputLines(suffix)
	numArr := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}

	var sum int64 = 0
	for _, line := range lines {
		var numbersArr []int64

		for idx, char := range line {
			number, ok := utils.RuneToInt64(char)
			if ok {
				numbersArr = append(numbersArr, number)
				continue
			}

			textAfterIdx := line[idx:]
			for idx, numberText := range numArr {
				if strings.HasPrefix(textAfterIdx, numberText) {
					number := int64(idx + 1)
					numbersArr = append(numbersArr, number)
					break
				}
			}
		}

		number := getNumber(numbersArr)
		sum = sum + number
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}

func getNumber(digits []int64) int64 {
	firstDigit := digits[0]
	lastDigit := digits[len(digits)-1]

	number := firstDigit*10 + lastDigit
	return number
}
