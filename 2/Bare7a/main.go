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

func cubeConundrum1(suffix int) {
	games := utils.ReadInputLines(suffix)
	maxDices := map[string]int{"red": 12, "green": 13, "blue": 14}

	sum := 0
	for idx, game := range games {
		sets := strings.Split(strings.Split(game, ": ")[1], "; ")

		isValid := true
		for _, set := range sets {
			dices := strings.Split(set, ", ")

			for _, dice := range dices {
				numberColor := strings.Split(dice, " ")
				number := utils.StrToInt(numberColor[0])
				color := numberColor[1]
				if number > maxDices[color] {
					isValid = false
					break
				}
			}

			if !isValid {
				break
			}
		}

		if isValid {
			sum += idx + 1
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
			dices := strings.Split(set, ", ")

			for _, dice := range dices {
				numberColor := strings.Split(dice, " ")
				number := utils.StrToInt(numberColor[0])
				color := numberColor[1]

				if totals[color] <= number {
					totals[color] = number
				}
			}
		}

		sum += totals["red"] * totals["green"] * totals["blue"]
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}
