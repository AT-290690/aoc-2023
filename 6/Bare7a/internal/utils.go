package utils

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func ReadInputText(suffix int) string {
	content, error := os.ReadFile(fmt.Sprintf("./input-%v.txt", suffix))
	if error != nil {
		log.Fatal(error)
	}

	str := string(content)
	return str
}

func FileToLines(text string) []string {
	lines := strings.Split(text, "\n")
	return lines
}

func ReadInputLines(suffix int) []string {
	file := ReadInputText(suffix)
	lines := FileToLines(file)
	return lines
}

func WriteOutputText(suffix int, text string) {
	file, err := os.Create(fmt.Sprintf("./output-%v.txt", suffix))
	if err != nil {
		log.Fatal(err)
	}

	_, err = file.WriteString(text)
	if err != nil {
		log.Fatal(err)
	}
}

func WriteOutputLines(suffix int, lines []string) {
	text := strings.Join(lines, "\n")
	WriteOutputText(suffix, text)
}

func RuneToInt(runeNumber rune) (int, bool) {
	number, isNumber := RuneToInt64(runeNumber)
	return int(number), isNumber
}

func RuneToInt64(runeNumber rune) (int64, bool) {
	number, err := strconv.ParseInt(fmt.Sprintf("%c", runeNumber), 10, 0)
	if err != nil {
		return 0, false
	}

	return number, true
}

func StrToInt(text string) int {
	number, err := strconv.Atoi(strings.TrimSpace(text))
	if err != nil {
		log.Panic(err)
	}

	return number
}

func StrArrToIntArr(numStrs []string) []int {
	intArr := make([]int, 0)

	for _, numStr := range numStrs {
		intArr = append(intArr, StrToInt(numStr))
	}

	return intArr
}

func ProdIntArr(nums []int) int {
	prod := 1
	for i := 0; i < len(nums); i++ {
		prod = prod * nums[i]
	}
	return prod
}
