package main

import (
	"fmt"
	"sort"
	"strings"

	utils "aoc-2023.bare7a.eu/internal"
)

func main() {
	camelCards1(1)
	camelCards2(2)
}

type Hand struct {
	power int
	cards string
	bet   int
}

func parseRealCard(text string) string {
	text = strings.ReplaceAll(text, "A", "Z")
	text = strings.ReplaceAll(text, "K", "Y")
	text = strings.ReplaceAll(text, "Q", "X")
	text = strings.ReplaceAll(text, "J", "W")
	text = strings.ReplaceAll(text, "T", "I")
	text = strings.ReplaceAll(text, "9", "H")
	text = strings.ReplaceAll(text, "8", "G")
	text = strings.ReplaceAll(text, "7", "F")
	text = strings.ReplaceAll(text, "6", "E")
	text = strings.ReplaceAll(text, "5", "D")
	text = strings.ReplaceAll(text, "4", "C")
	text = strings.ReplaceAll(text, "3", "B")
	text = strings.ReplaceAll(text, "2", "A")
	return text
}

func parseFakeCard(text string) string {
	text = strings.ReplaceAll(text, "A", "Z")
	text = strings.ReplaceAll(text, "K", "Y")
	text = strings.ReplaceAll(text, "Q", "X")
	text = strings.ReplaceAll(text, "J", "0")
	text = strings.ReplaceAll(text, "T", "I")
	text = strings.ReplaceAll(text, "9", "H")
	text = strings.ReplaceAll(text, "8", "G")
	text = strings.ReplaceAll(text, "7", "F")
	text = strings.ReplaceAll(text, "6", "E")
	text = strings.ReplaceAll(text, "5", "D")
	text = strings.ReplaceAll(text, "4", "C")
	text = strings.ReplaceAll(text, "3", "B")
	text = strings.ReplaceAll(text, "2", "A")
	return text
}

func getPower(cards string) int {
	power := 0
	cardsMap := make(map[string]int)

	for _, card := range strings.Split(cards, "") {
		if cardsMap[card] > 0 {
			power += cardsMap[card]
		}
		cardsMap[card]++
	}

	return power
}

func getFakePower(cards string) int {
	cardsMap := make(map[string]int)
	for _, card := range strings.Split(cards, "") {
		cardsMap[card]++
	}

	maxV := -1
	maxK := ""
	for k, v := range cardsMap {
		if k == "W" {
			continue
		}

		if v > maxV {
			maxK = k
			maxV = v
			continue
		}

		if v == maxV && k > maxK {
			maxK = k
			maxV = v
		}
	}

	if maxK == "" {
		maxK = "W"
	}

	fakeCards := strings.ReplaceAll(cards, "W", maxK)
	fakePower := getPower(fakeCards)

	return fakePower
}

func sortCards(hands []Hand) []Hand {
	sort.Slice(hands, func(i, j int) bool {
		if hands[i].power < hands[j].power {
			return true
		}

		if hands[i].power > hands[j].power {
			return false
		}

		if hands[i].cards < hands[j].cards {
			return true
		}

		return false
	})

	return hands
}

func camelCards1(suffix int) {
	lines := utils.ReadInputLines(suffix)

	hands := make([]Hand, 0)
	for _, line := range lines {
		cardsBet := strings.Fields(line)

		cards := parseRealCard(cardsBet[0])
		bet := utils.StrToInt(cardsBet[1])

		power := getPower(cards)
		hands = append(hands, Hand{power, cards, bet})
	}

	hands = sortCards(hands)

	sum := 0
	for idx, hand := range hands {
		sum += hand.bet * (idx + 1)
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}

func camelCards2(suffix int) {
	lines := utils.ReadInputLines(suffix)

	hands := make([]Hand, 0)
	for _, line := range lines {
		cardsBet := strings.Fields(line)

		cards := parseRealCard(cardsBet[0])
		bet := utils.StrToInt(cardsBet[1])

		fakePower := getFakePower(cards)
		fakeCards := parseFakeCard(cardsBet[0])

		hands = append(hands, Hand{fakePower, fakeCards, bet})
	}

	hands = sortCards(hands)

	sum := 0
	for idx, hand := range hands {
		sum += hand.bet * (idx + 1)
		fmt.Println(hand.cards, hand.power, (idx + 1))
	}

	result := fmt.Sprint(sum)
	utils.WriteOutputText(suffix, result)
}
