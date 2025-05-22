// components/__tests__/QuestionCard.test.tsx
import {render, screen, fireEvent, act} from '@testing-library/react'
import QuestionCard from '@/components/QuestionCard'
import {Question} from '@/utils/apiTypes'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

// Mock requestAnimationFrame and cancelAnimationFrame
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: jest.fn((cb: FrameRequestCallback) => {
    return setTimeout(cb, 16) // Simulate 60fps
  })
})

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: jest.fn((id: number) => {
    clearTimeout(id)
  })
})

// Mock data - fixed to include all required properties
const mockQuestion: Question = {
  q: 'What is the capital of France?',
  correct: 'Paris',
  wrong: ['London', 'Berlin', 'Madrid'],
  difficulty: 1,
  category: 'Geography',
  hint: 'This city is known as the City of Light.'
}

const mockLives = {
  fifty: true,
  hint: true,
  change: true
}

describe('QuestionCard', () => {
  it('renders question correctly', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        action={jest.fn()}
        lives={mockLives}
        onUseFiftyAction={jest.fn()}
        onUseHintAction={jest.fn()}
        onChangeQuestionAction={jest.fn()}
        removedOptions={[]}
        startTime={Date.now()}
        pointValue={100}
      />
    )

    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
    expect(screen.getByText('Madrid')).toBeInTheDocument()
  })

  it('calls action with selected answer', () => {
    const mockAction = jest.fn()
    jest.useFakeTimers()

    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        action={mockAction}
        lives={mockLives}
        onUseFiftyAction={jest.fn()}
        onUseHintAction={jest.fn()}
        onChangeQuestionAction={jest.fn()}
        removedOptions={[]}
        startTime={Date.now()}
        pointValue={100}
      />
    )

    fireEvent.click(screen.getByText('Paris'))

    // Wrap timer advancement in act() to avoid React warnings
    act(() => {
      jest.advanceTimersByTime(600) // Account for the timeout in the component
    })

    expect(mockAction).toHaveBeenCalledWith('Paris')

    jest.useRealTimers()
  })

  it('shows hint when hint lifeline is used', () => {
    const mockUseHint = jest.fn()

    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        action={jest.fn()}
        lives={mockLives}
        onUseFiftyAction={jest.fn()}
        onUseHintAction={mockUseHint}
        onChangeQuestionAction={jest.fn()}
        removedOptions={[]}
        startTime={Date.now()}
        pointValue={100}
      />
    )

    // Find and click the hint button
    const hintButton = screen.getByRole('button', {name: /hint/i})
    fireEvent.click(hintButton)

    expect(mockUseHint).toHaveBeenCalled()
  })
})
