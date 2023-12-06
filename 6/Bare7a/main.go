package main

import (
	"fmt"
	"strings"

	utils "aoc-2023.bare7a.eu/internal"
)

func main() {
	boats1(1)
	boats2(2)
}

func getWinsCount(time int, dist int) int {
	wins := make([]int, 0)

	losses := 0
	currTime := 0
	for {
		currSpeed := time - currTime
		currDistance := currSpeed * currTime

		if currDistance > dist {
			break
		}

		losses++
		currTime++
	}

	win := time - (losses * 2) + 1
	wins = append(wins, win)

	sum := utils.ProdIntArr(wins)
	return sum
}

func boats1(suffix int) {
	lines := utils.ReadInputLines(suffix)

	times := utils.StrArrToIntArr(strings.Fields(strings.Split(lines[0], ":")[1]))
	dists := utils.StrArrToIntArr(strings.Fields(strings.Split(lines[1], ":")[1]))

	wins := make([]int, 0)
	rounds := len(times)

	for i := 0; i < rounds; i++ {
		time := times[i]
		dist := dists[i]

		win := getWinsCount(time, dist)
		wins = append(wins, win)
	}

	sum := utils.ProdIntArr(wins)

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}

func boats2(suffix int) {
	lines := utils.ReadInputLines(suffix)

	time := utils.StrToInt(strings.Join(strings.Fields(strings.Split(lines[0], ":")[1]), ""))
	dist := utils.StrToInt(strings.Join(strings.Fields(strings.Split(lines[1], ":")[1]), ""))
	wins := getWinsCount(time, dist)

	result := fmt.Sprint(wins)
	utils.WriteOutputText(suffix, result)
}
