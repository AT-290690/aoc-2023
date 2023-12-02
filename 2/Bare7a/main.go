package main

import (
	"fmt"
	"strings"

	utils "aoc-2023.bare7a.eu/internal"
)

func main() {
	cubeConundrum1(1)
	cubeConundrum2(2)
}

func isValidGame(color string, number int) bool {
	if color == "red" && number > 12 {
		return false
	}

	if color == "green" && number > 13 {
		return false
	}

	if color == "blue" && number > 14 {
		return false
	}

	return true
}

func cubeConundrum1(suffix int) {
	games := utils.ReadInputLines(suffix)

	sum := 0
	for idx, game := range games {
		sets := strings.Split(strings.Split(game, ": ")[1], "; ")

		isValid := true
		for _, set := range sets {
			throws := strings.Split(set, ", ")

			for _, throw := range throws {
				numberColor := strings.Split(throw, " ")
				number := utils.StrToInt(numberColor[0])
				color := numberColor[1]
				if !isValidGame(color, number) {
					isValid = false
					break
				}
			}

			if !isValid {
				break
			}
		}

		if isValid {
			sum = sum + idx + 1
		}
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}

func cubeConundrum2(suffix int) {
	games := utils.ReadInputLines(suffix)

	sum := 0
	for _, game := range games {
		sets := strings.Split(strings.Split(game, ": ")[1], "; ")

		totals := map[string]int{"red": 0, "green": 0, "blue": 0}
		for _, set := range sets {
			throws := strings.Split(set, ", ")

			for _, throw := range throws {
				numberColor := strings.Split(throw, " ")
				number := utils.StrToInt(numberColor[0])
				color := numberColor[1]

				if totals[color] <= number {
					totals[color] = number
				}
			}
		}

		gameSum := totals["red"] * totals["green"] * totals["blue"]
		sum = sum + gameSum
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}
