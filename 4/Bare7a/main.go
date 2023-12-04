package main

import (
	"fmt"
	"math"
	"strings"

	utils "aoc-2023.bare7a.eu/internal"
)

func main() {
	scratchcards1(1)
	scratchcards2(2)
}

func getWinNumbersCount(winNumbersStr, userNumbersStr string) int {
	count := 0

	winNumbersMap := make(map[int]bool)
	for _, winNumberStr := range strings.Fields(winNumbersStr) {
		winNumber := utils.StrToInt(winNumberStr)
		winNumbersMap[winNumber] = true
	}

	for _, userNumberStr := range strings.Fields(userNumbersStr) {
		userNumber := utils.StrToInt(userNumberStr)
		_, ok := winNumbersMap[userNumber]
		if ok {
			count++
		}
	}

	return count
}

func scratchcards1(suffix int) {
	lines := utils.ReadInputLines(suffix)

	sum := 0
	for _, line := range lines {
		cardNumbers := strings.Split(line, ": ")
		winUserNumbers := strings.Split(cardNumbers[1], " | ")
		points := getWinNumbersCount(winUserNumbers[0], winUserNumbers[1])

		if points > 2 {
			points = int(math.Pow(2, float64(points)-1))
		}

		sum += points
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}

func scratchcards2(suffix int) {
	lines := utils.ReadInputLines(suffix)

	sum := 0
	winCounts := make(map[int]int)
	for idx, line := range lines {
		cardNumbers := strings.Split(line, ": ")
		winUserNumbers := strings.Split(cardNumbers[1], " | ")

		winCounts[idx]++
		wins := getWinNumbersCount(winUserNumbers[0], winUserNumbers[1])
		for winIdx := 0; winIdx < wins; winIdx++ {
			winCounts[winIdx+idx+1] += winCounts[idx]
		}

		sum += winCounts[idx]
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}
