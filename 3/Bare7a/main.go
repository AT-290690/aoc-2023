package main

import (
	"fmt"
	"strings"

	utils "aoc-2023.bare7a.eu/internal"
)

func main() {
	gearRatios1(1)
	gearRatios2(2)
}

func checkIfAdjacent(rowId int, colId int, lines *[]string) bool {
	rowLen := len((*lines)[rowId])
	for row := -1; row <= 1; row++ {
		currRow := rowId + row
		if currRow < 0 || currRow >= rowLen {
			continue
		}

		colLen := len((*lines)[rowId])
		for col := -1; col <= 1; col++ {
			currCol := colId + col
			if currCol < 0 || currCol >= colLen {
				continue
			}

			char := string((*lines)[currRow][currCol])
			if !strings.Contains("0123456789.", char) {
				return true
			}
		}
	}

	return false
}

func gearRatios1(suffix int) {
	lines := utils.ReadInputLines(suffix)

	sum := 0
	for rowId, line := range lines {
		isValid := false
		currNumber := ""

		for colId, char := range line {
			number, isNumber := utils.RuneToInt(char)

			if isNumber {
				currNumber = fmt.Sprintf("%v%v", currNumber, number)
				isValid = isValid || checkIfAdjacent(rowId, colId, &lines)
				continue
			}

			if isValid && len(currNumber) > 0 {
				sum += utils.StrToInt(currNumber)
			}

			isValid = false
			currNumber = ""
		}

		if isValid && len(currNumber) > 0 {
			sum += utils.StrToInt(currNumber)
		}
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}

func getCoords(currCoods string, rowId int, colId int, lines *[]string) string {
	if currCoods != "" {
		return currCoods
	}

	rowLen := len((*lines)[rowId])
	for row := -1; row <= 1; row++ {
		currRow := rowId + row
		if currRow < 0 || currRow >= rowLen {
			continue
		}

		colLen := len((*lines)[rowId])
		for col := -1; col <= 1; col++ {
			currCol := colId + col
			if currCol < 0 || currCol >= colLen {
				continue
			}

			char := string((*lines)[currRow][currCol])
			if char == "*" {
				return fmt.Sprintf("%v-%v", currRow, currCol)
			}
		}
	}

	return currCoods
}

func getGearSum(coordsMap *map[string][]int) int {
	sum := 0

	for _, numbers := range *coordsMap {
		if len(numbers) != 2 {
			continue
		}
		sum += (numbers[0] * numbers[1])
	}

	return sum
}

func gearRatios2(suffix int) {
	lines := utils.ReadInputLines(suffix)
	coordsMap := make(map[string][]int)

	for rowId, line := range lines {
		currNumber := ""
		currCoords := ""

		for colId, char := range line {
			number, isNumber := utils.RuneToInt(char)

			if isNumber {
				currNumber = fmt.Sprintf("%v%v", currNumber, number)
				currCoords = getCoords(currCoords, rowId, colId, &lines)
				continue
			}

			if len(currNumber) > 0 && currCoords != "" {
				coordsMap[currCoords] = append(coordsMap[currCoords], utils.StrToInt(currNumber))
			}

			currNumber = ""
			currCoords = ""
		}

		if len(currNumber) > 0 && currCoords != "" {
			coordsMap[currCoords] = append(coordsMap[currCoords], utils.StrToInt(currNumber))
		}
	}

	sum := getGearSum(&coordsMap)
	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}
