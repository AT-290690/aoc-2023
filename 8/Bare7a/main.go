package main

import (
	"fmt"
	"strings"

	utils "aoc-2023.bare7a.eu/internal"
)

func main() {
	// hauntedWasteland1(1)
	hauntedWasteland2(2)
}

func getPaths(pathLines []string) map[string]map[string]string {
	paths := make(map[string]map[string]string)
	for _, pathLine := range pathLines {
		nodePaths := strings.Split(pathLine, " = ")
		node := nodePaths[0]

		pathsStr := strings.Trim(strings.Trim(nodePaths[1], "("), ")")
		leftRight := strings.Split(pathsStr, ", ")

		paths[node] = make(map[string]string)
		paths[node]["L"] = leftRight[0]
		paths[node]["R"] = leftRight[1]
	}

	return paths
}

func getMoves(moveLine string) []string {
	moves := strings.Split(moveLine, "")
	return moves
}

func getValidPaths(paths map[string]map[string]string) []string {
	validPaths := make([]string, 0)

	for path := range paths {
		if strings.HasSuffix(path, "A") {
			validPaths = append(validPaths, path)
		}
	}

	return validPaths
}

func gcd(a, b int) int {
	for b != 0 {
		t := b
		b = a % b
		a = t
	}
	return a
}

func hauntedWasteland1(suffix int) {
	lines := utils.ReadInputLines(suffix)

	movesArr := getMoves(lines[0])
	pathsMap := getPaths(lines[2:])

	movesLen := len(movesArr)

	movesCount := 0
	movePosIdx := 0
	currNode := "AAA"
	for {
		if currNode == "ZZZ" {
			break
		}

		movesCount++

		move := movesArr[movePosIdx]
		currNode = pathsMap[currNode][move]

		movePosIdx = (movePosIdx + 1) % movesLen
	}

	result := fmt.Sprint(movesCount)
	utils.WriteOutputText(suffix, result)
}

func hauntedWasteland2(suffix int) {
	lines := utils.ReadInputLines(suffix)

	steps := getMoves(lines[0])
	network := getPaths(lines[2:])

	positions := getValidPaths(network)
	cycles := make([][]int, 0)

	for _, current := range positions {
		cycle := make([]int, 0)

		currentSteps := steps
		stepCount := 0

		firstZ := ""

		for {
			for stepCount == 0 || !strings.HasSuffix(current, "Z") {
				stepCount++
				current = network[current][currentSteps[0]]
				currentSteps = append(currentSteps[1:], currentSteps[0])
			}

			cycle = append(cycle, stepCount)
			if current == firstZ {
				break
			}

			if firstZ == "" {
				firstZ = current
				stepCount = 0
			}
		}

		cycles = append(cycles, cycle)
	}

	var nums []int
	for _, cycle := range cycles {
		nums = append(nums, cycle[0])
	}

	lcm := nums[0]
	for _, num := range nums[1:] {
		lcm = lcm * num / gcd(lcm, num)
	}

	result := fmt.Sprint(lcm)
	utils.WriteOutputText(suffix, result)
}
