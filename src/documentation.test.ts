import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { GameConfig } from './config';

const ROOT_DIR = path.resolve(__dirname, '..');

describe('Documentation Consistency', () => {
  const readmePath = path.join(ROOT_DIR, 'README.md');
  const gameDesignPath = path.join(ROOT_DIR, 'GAME_DESIGN.md');
  const architecturePath = path.join(ROOT_DIR, 'ARCHITECTURE.md');
  
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const gameDesignContent = fs.readFileSync(gameDesignPath, 'utf-8');
  const architectureContent = fs.readFileSync(architecturePath, 'utf-8');

  it('should reflect correct TIE Fighter score in README', () => {
    const tieScore = GameConfig.tieFighter.points;
    const pattern = new RegExp(`Destroy TIE Fighter.*${tieScore}`, 'i');
    expect(readmeContent).toMatch(pattern);
  });

  it('should reflect correct Fireball score in README', () => {
    const fireballScore = GameConfig.fireball.points;
    const pattern = new RegExp(`Destroy Fireball.*${fireballScore}`, 'i');
    expect(readmeContent).toMatch(pattern);
  });

  it('should reflect correct Death Star score in README', () => {
    const torpedoBonus = GameConfig.torpedo.bonusPoints;
    const pattern = new RegExp(`Destroy Death Star.*${torpedoBonus.toLocaleString('en-US')}`, 'i');
    expect(readmeContent).toMatch(pattern);
  });
  
  it('should reflect correct TIE Fighter score in GAME_DESIGN', () => {
    const tieScore = GameConfig.tieFighter.points;
    const pattern = new RegExp(`Destroy TIE Fighter.*${tieScore}`, 'i');
    expect(gameDesignContent).toMatch(pattern);
  });

  it('should reflect correct Fireball score in GAME_DESIGN', () => {
    const fireballScore = GameConfig.fireball.points;
    const pattern = new RegExp(`Destroy Fireball.*${fireballScore}`, 'i');
    expect(gameDesignContent).toMatch(pattern);
  });

  it('should reflect correct Death Star score in GAME_DESIGN', () => {
    const torpedoBonus = GameConfig.torpedo.bonusPoints;
    const pattern = new RegExp(`Destroy Death Star.*${torpedoBonus.toLocaleString('en-US')}`, 'i');
    expect(gameDesignContent).toMatch(pattern);
  });

  it('should not mention unimplemented "Inverted Option"', () => {
    expect(readmeContent).not.toMatch(/Inverted Option/i);
    expect(gameDesignContent).not.toMatch(/Inverted Option/i);
  });

  it('should not claim Audio features are implemented', () => {
    expect(readmeContent).not.toMatch(/Chiptune music/i);
    expect(gameDesignContent).not.toMatch(/Voice Synthesis/i);
  });
  
  it('should mention core components in ARCHITECTURE.md', () => {
    expect(architectureContent).toContain('StageManager');
    expect(architectureContent).toContain('CombatSystem');
    expect(architectureContent).toContain('src/stages/');
  });
});
