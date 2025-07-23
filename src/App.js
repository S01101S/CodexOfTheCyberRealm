import React, { useState, useEffect } from 'react';
import {v4 as uuidv4 } from "uuid";


const XP_PER_DAILY_TASK = 4;
const XP_PER_TODO_TASK = 7;

const createInitialProfile = (className) => {
  const baseStats = {
    ClassName: className,
    Level: 1,
    Processing: 5,
    Resilience: 5,
    Efficiency: 5,
    Logic: 5,
    CurrentCreativity: 10,
    MaxCreativity: 10,
    CurrentHealth: 10,
    MaxHealth: 10,
    CurrentXP: 0,
    NextLevelXP: 10,
    ByteCoins: 0,
    UnallocatedStatPoints: 0,
    Tasks: { Dailies: [], todos: [] },
    Inventory: []
  };


  switch (className) {
    case 'The Architect':
      baseStats.Logic += 2;
      baseStats.Efficiency += 1;
      break;
    case 'Sovereign of the Citadel':
      baseStats.Resilience += 2;
      baseStats.Logic += 1;
      break;
    case 'The Akashic':
      baseStats.Logic += 2;
      baseStats.Efficiency += 1;
      break;
    case 'The Machinist':
      baseStats.Efficiency += 2;
      baseStats.Resilience += 1;
      break;
    default:
      break;
  }
  return baseStats;
};


const Header = ({ onStatsClick }) => (
  <header className="flex items-center justify-end bg-header-bg text-white relative z-10 p-2.5 h-[50px]">
    <img className="h-[50px] mr-2.5" src="/images/logo.png" alt="Logo" />
    <h1 className="font-gowun-dodum text-white mr-auto mt-2.5 ml-2.5 text-[30px]">Codex</h1>
    
    {['Skill_Tree', 'Inventory'].map(text => (
      <button key={text} className="bg-transparent border-0 font-gowun-dodum text-white opacity-50 hover:opacity-100 transition-opacity duration-300 p-2.5">
        {text}
      </button>
    ))}
    <button onClick={onStatsClick} className="bg-transparent border-0 font-gowun-dodum text-white opacity-50 hover:opacity-100 transition-opacity duration-300 p-2.5">
      Stats
    </button>
    <button className="bg-transparent border-0 opacity-50 hover:opacity-100 transition-opacity duration-300 p-2.5">
      <img className="h-[40px]" src="/images/settingsIcon.png" alt="Settings" />
    </button>
  </header>
);

const CharacterStatus = ({ playerProfile, isHidden, onToggle }) => {
  if (!playerProfile) return null;

  const healthPercentage = (playerProfile.CurrentHealth / playerProfile.MaxHealth) * 100;
  const creativityPercentage = (playerProfile.CurrentCreativity / playerProfile.MaxCreativity) * 100;
  const xpPercentage = (playerProfile.CurrentXP / playerProfile.NextLevelXP) * 100;

  const StatBar = ({ title, currentValue, maxValue, percentage, barClass }) => (
    <>
      <p className="font-courier m-0 p-0 mb-1 mt-1">{title}</p>
      <div className="flex items-center gap-2.5">
        <div className="w-[160px] h-3 bg-black/30 border border-white/50 rounded-full flex items-center">
          <div className={`h-1 mx-1.5 rounded-full transition-all duration-500 ease-in-out ${barClass}`} style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="font-courier min-w-[10px] relative bottom-0.5">{`${currentValue} / ${maxValue}`}</span>
      </div>
    </>
  );

  const getSpriteSrc = () => {
    if (playerProfile.ClassName === 'Sovereign of the Citadel') {
      return '/images/SovereignOfTheCitadel.png';
    }

    return `https://placehold.co/150x150/00ffff/000000?text=${playerProfile.ClassName.charAt(0)}`;
  };

  return (
    <div className={`relative mb-5 transition-transform duration-400 ease-in-out ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="h-[200px] bg-status-bar-bg flex items-center p-4">
        <div className="w-[170px] h-[180px] bg-cyan-400 border border-status-bar-bg mb-5px ml-7 mt-4">
          <img className="h-[180px] w-full object-cover" src={getSpriteSrc()} alt="Character Sprite" />
        </div>
        <div className="text-white p-2.5">
          <StatBar title="Health" currentValue={playerProfile.CurrentHealth} maxValue={playerProfile.MaxHealth} percentage={healthPercentage} barClass="bg-green-400 shadow-[0_0_8px_2px_rgba(135,206,250,0.7)]" />
          <StatBar title="Creativity" currentValue={playerProfile.CurrentCreativity} maxValue={playerProfile.MaxCreativity} percentage={creativityPercentage} barClass="bg-[#8b27f6] shadow-[0_0_8px_2px_rgb(191,108,236)]" />
          <StatBar title="XP" currentValue={playerProfile.CurrentXP} maxValue={playerProfile.NextLevelXP} percentage={xpPercentage} barClass="bg-cyan-400 shadow-[0_0_8px_2px_rgba(135,206,250,0.7)]" />
        </div>
      </div>
      <div onClick={onToggle} className="absolute -bottom-10 left-0 w-full h-10 bg-black/50 hover:bg-black/70 text-white flex justify-center items-center cursor-pointer border-t border-[#555] transition-colors z-[1]">
        <span>{isHidden ? 'Show Stats' : 'Hide Stats'}</span>
        <i className={`border-solid border-white border-b-2 border-r-2 inline-block p-1 ml-2.5 transition-transform duration-400 ${isHidden ? 'rotate-45' : '-rotate-[135deg]'}`}></i>
      </div>
    </div>
  );
};

const ClassSelectionModal = ({ onClassSelect }) => {
    const classes = [
        { title: 'The Architect', description: 'You see the blueprint of the digital world. You excel at designing elegant systems, managing complexity, and building things to last. Your foundation is unshakable', stats: ['+2 Logic', '+1 Efficiency'], buttonText: 'Choose Architect', sprite: 'https://placehold.co/120x120/0f172a/ffffff?text=A' },
        { title: 'Sovereign of the Citadel', description: 'You are the master of the digital fortress. Every firewall, every encryption key, every line of defense answers to you. Where others see walls, you see a kingdom to command', stats: ['+2 Resilience', '+1 Logic'], buttonText: 'Choose Sovereign of the Citadel', sprite: '/images/SovereignOfTheCitadel.png' },
        { title: 'The Akashic', description: "You find patterns in the chaos of data, weaving strands of information into powerful predictions. You don't just see the present. You compute the future from the infinite library of code", stats: ['+2 Logic', '+1 Efficiency'], buttonText: 'Choose Akashic', sprite: 'https://placehold.co/120x120/0f172a/ffffff?text=Ak' },
        { title: 'The Machinist', description: "You work where the code meets the silicon. You crave raw performance and squeeze every last cycle out of the machine. For you, efficiency isn't a goal; it's an art form", stats: ['+2 Efficiency', '+1 Resilience'], buttonText: 'Choose Machinist', sprite: 'https://placehold.co/120x120/0f172a/ffffff?text=M' },
    ];

    return (
        <div className="fixed inset-0 z-[100] w-full h-full overflow-auto bg-black/10 flex items-start justify-center pt-5">
            <div className="relative bg-modal-bg/80 m-auto p-5 border border-modal-border w-[90%] before:content-[''] before:absolute before:w-[30px] before:h-[30px] before:border-l-[5px] before:border-t-[5px] before:border-cyan-400 before:top-0 before:left-0 after:content-[''] after:absolute after:w-[30px] after:h-[30px] after:border-r-[5px] after:border-b-[5px] after:border-cyan-400 after:bottom-0 after:right-0">
                <header className="flex justify-center text-black bg-transparent border border-white/20 shadow-[5px_5px_5px_rgba(255,255,255,0.2)] p-4">
                    <h1 className="animate-glow text-3xl text-white">NOTIFICATION</h1>
                </header>
                <div className="flex justify-center w-auto ml-10 text-white my-4">
                    <h2 className="animate-glow text-[28px]">MISSION: PICK YOUR CLASS</h2>
                </div>
                <hr className="border-white/30" />
                <div className="flex justify-between h-[580px] gap-3">
                    {classes.map(({ title, description, stats, sprite, buttonText }) => (
                        <div key={title} className="w-1/4 mt-5 bg-transparent border border-white/20 shadow-[0px_0px_10px_rgba(255,255,255,0.2)] opacity-70 hover:opacity-90 transition-opacity p-4 flex flex-col">
                            <h3 className="font-orbitron font-light text-white text-center animate-glow text-[17px]">{title}</h3>
                            <hr className="w-[90%] mx-auto border-white/30 my-2" />
                            <img className="block h-[120px] mx-auto my-4" src={sprite} alt={`${title} sprite`} />
                            <p className="mx-2.5 text-[15px] text-white/90 animate-glow flex-grow">{description}</p>
                            <p className="text-center text-white animate-glow-button mt-4">STATS:</p>
                            <ul className="list-none text-white animate-glow-button p-0 text-center">
                                {stats.map((stat, index) => <li key={index}>{stat}</li>)}
                            </ul>
                            <button onClick={() => onClassSelect(title)} className="block bg-none border border-white/20 mx-auto mt-5 mb-4 p-2.5 text-white text-base shadow-[0px_0px_10px_rgba(255,255,255,0.2)] animate-glow hover:animate-glow-button active:border-pink-500/20">
                                {buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const WipeOverlay = ({ chosenClass, onContinue }) => {

  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (!chosenClass) return;

    const messages = [
      "Synchronisation with the System..... Complete",
      `You have been granted the class: [${chosenClass}]`,
      "Welcome to the Codex Player"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;

    setLines([]);
    setCurrentLine('');
    setShowContinue(false);

    const typeInterval = setInterval(() => {
      if (messageIndex >= messages.length) {
        clearInterval(typeInterval);
        setShowContinue(true);
        return;
      }

      const currentMessage = messages[messageIndex];
      charIndex++;
      setCurrentLine(currentMessage.substring(0, charIndex));
      
      
      if (charIndex >= currentMessage.length) {
        setLines(prevLines => [...prevLines, currentMessage]);
        setCurrentLine('');
        messageIndex++;
        charIndex = 0;
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [chosenClass]);

  return (
    <div className="fixed inset-0 z-[11] flex flex-col items-center justify-start pt-[15vh] text-center bg-gradient-to-b from-gradient-start to-gradient-end">
      <h1 className="text-2xl z-[12] text-cyan-100 mb-10 border-b border-white/90 pb-2.5 w-1/2 max-w-sm animate-glow-typewriter">SYSTEM</h1>
      <div className="text-cyan-100 text-2xl animate-glow-typewriter">
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        <p>{currentLine}</p>
      </div>
        
      {showContinue && (
        <button onClick={onContinue} className="mt-10 py-4 px-9 text-white border border-cyan-300 cursor-pointer animate-glow hover:animate-glow-button">CONTINUE</button>
      )}
    </div>
  );
};

const StatsScreen = ({ onClose, playerProfile }) => {
    if (!playerProfile) return null;

    const StatRow = ({ label, value, children }) => (
        <div className="flex items-center mb-1.5 font-courier text-white">
            <span className="w-[100px] text-right mr-2.5">{label}:</span>
            {value && <span className="text-left min-w-[120px] inline-block">{value}</span>}
            {children}
        </div>
    );

    const ProgressBar = ({ percentage, valueText }) => (
        <div className="flex flex-col items-end">
            <div className="mt-[22px] w-[200px] h-3 bg-black/30 border border-white/50 rounded-full flex items-center">
                <div className="h-1 mx-1.5 rounded-md bg-sky-300 shadow-[0_0_8px_2px_rgba(135,206,250,0.7)] transition-width duration-500" style={{ width: `${percentage}%` }}></div>
            </div>
            <span className="m-0 p-0 mt-1.5 mr-[65px] min-w-0">{valueText}</span>
        </div>
    );

    return (
        <div className="fixed top-[6%] left-0 w-full h-[90%] z-20 flex flex-col justify-between items-center pointer-events-auto">
            <header className="h-[10%] w-[90%] bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 flex-shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 0, 100% 53%, 73% 53%, 58% 100%, 39% 100%, 24% 53%, 0 53%, 0 0)' }}></header>
            <div className="m-0 p-0 -mt-24 -mb-24 w-[85%] h-full text-center flex flex-col bg-stats-bg animate-move-circuits" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%236200ff' fill-opacity='0.54' opacity='0.2' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`, 
              backgroundColor: 'rgb(50,5,87)' }}>
                <button onClick={onClose} className="text-4xl text-white/70 absolute z-20 top-[10%] right-[9%] bg-transparent border border-white/50 w-[60px] cursor-pointer transition-colors hover:text-blue-400 hover:border-blue-400/50">&times;</button>
                <h1 className="font-gowun-dodum text-white pt-[70px] animate-glow text-4xl">STATS</h1>
                <hr className="border-white/50 w-4/5 mx-auto my-4" />
                <p className="font-courier text-xl text-white mt-5 animate-glow">Class: {playerProfile.ClassName}</p>
                <div className="ml-[100px] flex justify-around mb-10 text-white animate-glow items-center">
                    <div className="mt-[50px] text-left">
                        <StatRow label="Level" value={playerProfile.Level} />
                        <StatRow label="Health"><ProgressBar percentage={(playerProfile.CurrentHealth / playerProfile.MaxHealth) * 100} valueText={`${playerProfile.CurrentHealth} / ${playerProfile.MaxHealth}`} /></StatRow>
                        <StatRow label="Creativity"><ProgressBar percentage={(playerProfile.CurrentCreativity / playerProfile.MaxCreativity) * 100} valueText={`${playerProfile.CurrentCreativity} / ${playerProfile.MaxCreativity}`} /></StatRow>
                        <StatRow label="XP"><ProgressBar percentage={(playerProfile.CurrentXP / playerProfile.NextLevelXP) * 100} valueText={`${playerProfile.CurrentXP} / ${playerProfile.NextLevelXP}`} /></StatRow>
                    </div>
                    <div className="mt-[20px] mr-[150px] space-y-[39px]">
                        <StatRow label="Processing" value={playerProfile.Processing} />
                        <StatRow label="Resilience" value={playerProfile.Resilience} />
                        <StatRow label="Efficiency" value={playerProfile.Efficiency} />
                        <StatRow label="Logic" value={playerProfile.Logic} />
                    </div>
                </div>
                <p className="font-courier text-white m-0 mr-7 animate-glow">Available Stat Points: {playerProfile.UnallocatedStatPoints}</p>
            </div>
            <footer className="h-[10%] w-[90%] bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 flex-shrink-0" style={{ clipPath: 'polygon(0% 47%, 24% 47%, 39% 0%, 58% 0%, 73% 47%, 100% 47%, 100% 100%, 0% 100%)' }}></footer>
        </div>
    );
};

const TaskManagement = ({ onAddDailyClick, onToDoClick, tasks, isHidden, onToggleDaily, onToggleToDo }) => {
    const TaskColumn = ({ title, onAddClick, taskList, onToggleItem }) => (
        <div className={`mt-10 transition-transform duration-400 ease-in-out ${isHidden ? '-translate-y-2/5' : 'translate-y-0'}`}>
            <div className="flex items-center relative w-[300px] ml-[50px] bg-[rgba(186,186,186,0.5)]">
                <header className="font-courier text-white text-center text-xl flex-grow">
                    {title}
                </header>
                <button onClick={onAddClick} className="absolute top-1/2 -translate-y-1/2 right-2.5 z-10 text-xl rounded-full w-5 h-5 flex items-center justify-center bg-gray-200 text-black">+</button>
            </div>
            <ul className="m-0 p-0 border border-white/50 w-[300px] ml-[50px] min-h-[350px] bg-white/50">
                {taskList
                  .filter(task => !task.completed)
                  .map((task, index) => (
                    <li key={task.id} className={`list-none border border-purple-800 p-3 font-courier text-white bg-purple-600 flex items-center overflow-wrap: word-break: break-all ${task.completed ? 'bg-green-500' : 'bg-purple-600'}`}>
                      <input type="checkbox" checked={task.completed} onChange={() => onToggleItem(task.id)} className="appearance-none w-6 h-6 shrink-0 border border-white bg-white bg-transparent rounded-sm cursor-pointer relative mr-2 checked:bg-purple-500 checked:border-white checked:after:content-[''] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-2 checked:after:h-4 checked:after:border-white checked:after:border-b-2 checked:after:border-r-2 checked:after:rotate-45"/>
                      {task.text}</li>
                ))}
            </ul>
        </div>
    );
    return (
        <div className={`flex space-x-8 transition-transform ${isHidden ? '-translate-y-[200px]' : ''}`}>
            <TaskColumn title="Dailies" onAddClick={onAddDailyClick} taskList={tasks?.Dailies || []} onToggleItem={onToggleDaily}/>
            <TaskColumn title="To-Do" onAddClick={onToDoClick} taskList={tasks?.todos || []} onToggleItem={onToggleToDo} />
        </div>
    );
};

const DailyInputModal = ({ onClose, onConfirm }) => {
    const [taskInput, setTaskInput] = useState('');
    const [isActive, setIsActive] = useState(false);
    
    const handleConfirm = () => {
        if (taskInput.trim()) {
            onConfirm(taskInput, isActive);
            setTaskInput(''); 
        }
    };

    const handleRecurringClick = () => {
      setIsActive(prevIsActive => !prevIsActive);
    };
    
    return (
    <div className="fixed z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/5 text-white flex flex-col items-center p-4 border-2 border-purple-400 shadow-lg" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%236200ff' fill-opacity='0.54' opacity='0.2' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`, 
            backgroundColor: 'rgb(50,5,87)'}}>
         <button onClick={onClose} className="absolute top-2.5 right-2.5 text-white bg-transparent border border-white/50 w-[60px] h-[50px] text-2xl cursor-pointer hover:text-blue-400 hover:border-blue-400/50 after:bg-green-500">X</button>
        <p className="mt-8 text-2xl animate-glow">Enter Daily Task</p>
        <hr className="w-[90%] border-white/30 my-4" />
        <input 
            type="text" 
            placeholder="Enter daily task..." 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-4/5 h-1/5 bg-cyan-800/50 border border-cyan-300 rounded-lg text-white placeholder-white/70 p-4" 
        />
        <div className="flex flex-row justify-between">
          <button onClick={handleConfirm} className="mt-[50px] mb-8 h-[50px] w-[150px] bg-transparent text-white text-xl uppercase border border-white/50 hover:text-blue-400 hover:border-blue-400/50">
            Confirm
        </button>
        <button onClick={handleRecurringClick} className={`mt-auto ml-5 mb-8 h-[50px] w-[150px] text-white text-x1 uppercase border border-white/50 hover:text-blue-400 hover:border-blue-400/50 ${isActive ? 'bg-green-500 hover:text-black' : 'bg-transparent'}`}>
            Recurring Daily
        </button>
        </div>
        
    </div>
    );
};

const ToDoInputModal = ({ onClose, onConfirm}) => {
  const [taskInput, setTaskInput] = useState('');

  const handleConfirm = () =>{
    
    if(taskInput.trim())
    {
      onConfirm(taskInput);
      setTaskInput('');
    }
  };

  return(
    <div className="fixed z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/5 text-white flex flex-col items-center p-4 border-2 border-purple-400 shadow-lg" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%236200ff' fill-opacity='0.54' opacity='0.2' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`, 
            backgroundColor: 'rgb(50,5,87)'}}>
        
        <button onClick={onClose} className="absolute top-2.5 right-2.5 text-white bg-transparent border border-white/50 w-[60px] h-[50px] text-2x1 cursor-pointer hover:text-blue-400 hover:border-blue-400/50">X</button>
      <p className="mt-8 text-[25px] animate-glow">Enter To-Do Task</p>
      <hr className="w-[90%] border-white/30 my-4"></hr>
      <input
          type="text"
          placeholder="Enter to-do task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-4/5 h-1/5 bg-cyan-800/50 border border-cyan-300 rounded-lg text-white placeholder-white/70 p-4">
      </input>

      <button onClick={handleConfirm} className="mt-auto mb-8 h-1/5 w-1/5 bg-transparent text-white text-x1 uppercase border border-white/50 hover:text-blue-400 hover:border-blue-400/50">
          Confirm
      </button>
    </div>
  );
};


// --- Main App Component ---

function App() {
  // State for player data
  const [playerProfile, setPlayerProfile] = useState(() => {
    try {
      const storedProfile = localStorage.getItem("PlayerProfile");
      return storedProfile ? JSON.parse(storedProfile) : null;
    } catch (error) {
      console.error("Failed to parse player profile from localStorage", error);
      localStorage.removeItem("PlayerProfile"); 
      return null;
    }
  });
  
  // State for UI visibility
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(false);
  const [isStatsScreenVisible, setStatsScreenVisible] = useState(false);
  const [isDailyModalVisible, setDailyModalVisible] = useState(false);
  const [isToDoModalVisible, setToDoModalVisible] = useState(false);
  const [showWipe, setShowWipe] = useState(false);


  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (playerProfile) {
      localStorage.setItem("PlayerProfile", JSON.stringify(playerProfile));
    }
  }, [playerProfile]);

  const handleClassSelect = (className) => {
    const newProfile = createInitialProfile(className);
    setPlayerProfile(newProfile);
    setShowWipe(true);
  };

  const handleContinueFromWipe = () => {
    setShowWipe(false);
  };


  const checkLevelUp = (updatedProfile) => {
    
    let currentProfile = {...updatedProfile};

    while(currentProfile.CurrentXP >= currentProfile.NextLevelXP)
    {
      currentProfile.Level += 1;
      currentProfile.CurrentXP -= currentProfile.NextLevelXP;
      currentProfile.NextLevelXP = Math.floor(currentProfile.NextLevelXP * 1.5);
      currentProfile.UnallocatedStatPoints += 1;

      console.log("You leveled Up");
    }

    return currentProfile;

  };



  const handleAddDailyTask = (taskText, isRecurring) => {
    if (!playerProfile) return;

    const currentTime = new Date().getTime();
    const twentyFourHrsInMs = 24 * 60 * 60 * 1000;


    const newTask = {
      id: uuidv4(),
      text: taskText,
      completed: false,
      createdTime: currentTime,
      expirationTime: currentTime + twentyFourHrsInMs,
      recurringTask: isRecurring
    };

    const updatedProfile = {
      ...playerProfile,
      Tasks: {
        ...playerProfile.Tasks,
        Dailies: [...playerProfile.Tasks.Dailies, newTask]
      }
    };
    setPlayerProfile(updatedProfile);
    setDailyModalVisible(false);
  };

  const handleTodoTask = (taskText) => {
    if(!playerProfile) return;

    const newTask = {
      id: uuidv4(),
      text: taskText,
      completed: false
    };

    const updatedProfile = {
      ...playerProfile,
      Tasks: {
        ...playerProfile.Tasks,
        todos: [...playerProfile.Tasks.todos, newTask]
      }
    };

    setPlayerProfile(updatedProfile);
    setToDoModalVisible(false);
  }


  const handleToggleDaily = (taskID) => {


    const originalDaily = playerProfile.Tasks.Dailies.find(task => task.id === taskID);
    let completedDailyXp = 0;

    if(originalDaily.completed === false)
    {
      completedDailyXp = XP_PER_DAILY_TASK;
    }

    const updatedDaily = playerProfile.Tasks.Dailies.map((task, index) => {

      if(task.id === taskID)
      {
        return{
          ...task,
          completed: !task.completed,
        };

      }

      return task;
    }) 


    setPlayerProfile(prevProfile => {
      
      const newCurrentXp = playerProfile.CurrentXP + completedDailyXp;

      let updatedProfile = {
        ...prevProfile,
        CurrentXP: newCurrentXp,
        Tasks: {
          ...prevProfile.Tasks,
          Dailies: updatedDaily
        }
      }

      updatedProfile = checkLevelUp(updatedProfile);

      return updatedProfile;

    });
  };

  const handleToggleToDo = (taskID) => {
      
    const originalToDo = playerProfile.Tasks.todos.find(task => task.id === taskID);
    let completedToDoXp = 0;

    if(originalToDo.completed === false)
    {
      completedToDoXp += XP_PER_TODO_TASK;
    }

    const updatedToDo = playerProfile.Tasks.todos.map((task, index) =>{


      if(task.id === taskID)
      { 
        return{
          ...task,
          completed: !task.completed
        };
      }

      return task;
    })


    setPlayerProfile(prevProfile => {
      
      const newCurrentXp = playerProfile.CurrentXP + completedToDoXp;

      let updatedProfile = {
        ...prevProfile,
        CurrentXP: newCurrentXp,
        Tasks: {
          ...prevProfile.Tasks,
          todos: updatedToDo
        }
      }

      updatedProfile = checkLevelUp(updatedProfile);

      return updatedProfile
    });
  }


    useEffect(() =>{
      try{
        localStorage.setItem("PlayerProfile", JSON.stringify(playerProfile));
      }
      catch (error){
        console.error("Error saving player profile to localStorage");
      }
    }, [playerProfile]);


    useEffect(() => {

      const intervalID = setInterval(() => {

        let changesMade = false;

        const updatedDailyTasks = playerProfile.Tasks.Dailies.map((task) => {

          const currentTime = new Date().getTime();
          
          const hasExpired = task.expirationTime && currentTime > task.expirationTime;

          if(task.recurringTask && hasExpired)
          {
            changesMade = true;
            const newCreatedTime = currentTime;
            const twentyFourHrsInMs = 24 * 60 * 60 * 1000;
            const newExpirationTime = newCreatedTime + twentyFourHrsInMs;
            return{
              ...task, 
              completed: false,
              createdTime: newCreatedTime,
              expirationTime: newExpirationTime
            }
          }
          else if(hasExpired)
          {
            changesMade = true;
            return null;
          }
          else
          {
            return task;  
          }

        })

        const finalChanges = updatedDailyTasks.filter(filteredTask => filteredTask !== null && filteredTask !== undefined);

        if(changesMade)
        {
          setPlayerProfile(prevProfile => ({
            ...prevProfile,
            Tasks:{
              ...prevProfile.Tasks,
              Dailies: finalChanges
            }
          }));
        }
      }, 5000);

      return () => clearInterval(intervalID);
    }, [playerProfile]);


  // Determine if the class selection modal should be visible
  const isClassModalVisible = !playerProfile && !showWipe;

  return (
    <div className="bg-custom-bg min-h-screen font-gowun-dodum text-white overflow-x-hidden">
      {/* Conditional Rendering of Modals and Overlays */}
      {isClassModalVisible && <ClassSelectionModal onClassSelect={handleClassSelect} />}
      {showWipe && <WipeOverlay chosenClass={playerProfile?.ClassName} onContinue={handleContinueFromWipe} />}
      {isStatsScreenVisible && <StatsScreen onClose={() => setStatsScreenVisible(false)} playerProfile={playerProfile} />}
      {isDailyModalVisible && <DailyInputModal onClose={() => setDailyModalVisible(false)} onConfirm={handleAddDailyTask} />}
      {isToDoModalVisible && <ToDoInputModal onClose={() => setToDoModalVisible(false)} onConfirm={handleTodoTask} />}

      
      <Header onStatsClick={() => setStatsScreenVisible(true)} />
      <CharacterStatus 
        playerProfile={playerProfile} 
        isHidden={isStatusBarHidden} 
        onToggle={() => setIsStatusBarHidden(!isStatusBarHidden)} 
      />
      <TaskManagement 
        onAddDailyClick={() => setDailyModalVisible(true)} 
        onToDoClick={() => setToDoModalVisible(true)}
        tasks={playerProfile?.Tasks}
        isHidden={isStatusBarHidden}
        onToggleDaily={handleToggleDaily}
        onToggleToDo={handleToggleToDo}
      />
    </div>
  );
}

export default App;
