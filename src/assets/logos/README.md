# Logos Directory

This directory contains all logo assets for the TaPay Insurance Demo project.

## Available Logos

### Static Logos (PNG)
- **nexus_logo.png** (156KB) - Main Nexus logo
- **Nexus_wide_logo_blak.png** (41KB) - Wide Nexus logo in black
- **Nexus_Logo_only_Icon_Black.png** (35KB) - Nexus icon only (black)
- **Nexus_Main_Logo_G.png** (37KB) - Nexus main logo variant G
- **excel_logo.png** (28KB) - Excel logo

### Animated Logos (GIF)
- **Nexus_Main_Loader_Animation.gif** (3.2MB) - Main loader animation
- **White_Nexus_Main_Loader_Animation.gif** (3.0MB) - White version of loader
- **Nexus_Wide_Logo_Animation_Black_Whithout_Slogan.gif** (3.5MB) - Wide animated logo without slogan

## Usage

Import logos using the index file:

```typescript
import {
  NexusLogo,
  NexusWideLogoBlack,
  NexusLogoIconBlack,
  NexusMainLoaderAnimation
} from '@/assets/logos';

// In your component
<img src={NexusLogo} alt="Nexus Logo" />
```

Or import directly:

```typescript
import nexusLogo from '@/assets/logos/nexus_logo.png';

<img src={nexusLogo} alt="Nexus Logo" />
```
