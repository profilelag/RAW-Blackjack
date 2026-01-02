import _ from "lodash";
const cardRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
interface Card {
    suit: string, // Hearts, Spades, Clubs, Diamonds
    value: number // 1-13
}
export class BlackjackGame {
    private cards = [
        cardRange.map(value => ({ suit: "Hearts", value })),
        cardRange.map(value => ({ suit: "Spades", value })),
        cardRange.map(value => ({ suit: "Clubs", value })),
        cardRange.map(value => ({ suit: "Diamonds", value }))
    ].flat()
    private playerHand: Array<Card> = []
    private dealerHand: Array<Card> = []
    private betAmount: number
    private activeGame: boolean

    static getHandValue(hand: Array<Card>): number {
        if(!hand || hand.length === 0) return 0
        let handValue = 0
        for (const cardValue of hand.map(x => x.value).sort().reverse())
            if (cardValue !== 1) handValue += Math.min(cardValue, 10)
            else handValue += (handValue + 11 <= 21) ? 11 : 1
        return handValue
    }

    constructor(bet: number) {
        this.betAmount = Math.abs(bet)
        this.activeGame = true

        this.hit()
        this.hit()
        this.dealDealer()
        this.dealDealer()

        if (BlackjackGame.getHandValue(this.playerHand) === 21 || BlackjackGame.getHandValue(this.dealerHand) === 21)
            this.activeGame = false

    }
    private getRandomCard = (): Card => {
        if(this.cards.length === 0) throw new Error("No cards left in the deck")
        return this.cards.splice(_.random(0, this.cards.length - 1), 1)[0]
    }
    private dealDealer = (): Array<Card> => {
        this.dealerHand.push(this.getRandomCard())
        return this.dealerHand
    }

    public hit = (): { active: boolean, hand: Array<Card>, dealer: Array<Card> } => {
        if (!this.isActive()) throw new Error("Inactive game")
        this.playerHand.push(this.getRandomCard())
        if (BlackjackGame.getHandValue(this.playerHand) >= 21) this.activeGame = false
        return { active: this.isActive(), hand: this.playerHand, dealer: this.getDealer() }
    }
    public stand = () => {
        if (!this.isActive()) throw new Error("Inactive game")
        while(BlackjackGame.getHandValue(this.dealerHand) < 17) {
            this.dealDealer()
        }
        this.activeGame = false
    }
    public getAwardAmount = (): number => {
        if (this.isActive()) throw new Error("Active game")
        const playerValue = BlackjackGame.getHandValue(this.playerHand)
        const dealerValue = BlackjackGame.getHandValue(this.dealerHand)
        if(playerValue === 21 && this.playerHand.length === 2) return this.betAmount * 1.5
        if(playerValue > 21) return -this.betAmount
        if(dealerValue > 21) return this.betAmount
        if(playerValue > dealerValue) return this.betAmount
        if(playerValue < dealerValue) return -this.betAmount

        return 0
    }
    public isActive = (): boolean => this.activeGame
    public getDealer = (): Array<Card> => this.isActive() ? [this.dealerHand[0]] : this.dealerHand
    public getPlayer = (): Array<Card> => this.playerHand
}