# Animations Directory

This directory contains Lottie animation files for the TaPay Insurance Demo project.

## Available Animations

- **Apple Pay Face ID Checkout.lottie** (2.0MB) - Apple Pay Face ID checkout animation

## Usage

To use Lottie animations in React, you need to install a Lottie player library:

### Option 1: Using @lottiefiles/dotlottie-react (Recommended for .lottie files)

```bash
npm install @lottiefiles/dotlottie-react
```

```typescript
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ApplePayAnimation from '@/assets/animations/Apple Pay Face ID Checkout.lottie';

function MyComponent() {
  return (
    <DotLottieReact
      src={ApplePayAnimation}
      loop
      autoplay
      style={{ width: 200, height: 200 }}
    />
  );
}
```

### Option 2: Using lottie-react

```bash
npm install lottie-react
```

```typescript
import Lottie from 'lottie-react';
import animationData from '@/assets/animations/Apple Pay Face ID Checkout.lottie';

function MyComponent() {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: 200, height: 200 }}
    />
  );
}
```

## Installation

Choose one of the libraries above and install it before using animations:

```bash
# For .lottie format (recommended)
npm install @lottiefiles/dotlottie-react

# OR for standard Lottie
npm install lottie-react
```
