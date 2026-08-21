// Friendlier grade calibration: bad runs tend toward C, good runs A, great runs high A, excellent runs S.
const GRADE_THRESHOLDS_V3={S:91,A:82,B:76,C:68,D:60};

categoryGrade=function(score){
  if(score>=GRADE_THRESHOLDS_V3.S)return"S";
  if(score>=GRADE_THRESHOLDS_V3.A)return"A";
  if(score>=GRADE_THRESHOLDS_V3.B)return"B";
  if(score>=GRADE_THRESHOLDS_V3.C)return"C";
  if(score>=GRADE_THRESHOLDS_V3.D)return"D";
  return"F";
};
grade=function(score){return categoryGrade(score)};

nextThresholdText=function(score){
  if(score>=91)return"S threshold cleared in every category";
  if(score>=82)return`Need ${(91-score).toFixed(1)} more in the weakest category for S`;
  if(score>=76)return`Need ${(82-score).toFixed(1)} more in the weakest category for A`;
  if(score>=68)return`Need ${(76-score).toFixed(1)} more in the weakest category for B`;
  if(score>=60)return`Need ${(68-score).toFixed(1)} more in the weakest category for C`;
  return`Need ${(60-score).toFixed(1)} more in the weakest category for D`;
};

breakdownMarkup=function(picks,title){
  const balanced=scoreFor(picks),avg=meanCategoryScore(picks),weak=weakestCategory(picks),genres=new Set(picks.map(p=>p.genre)).size,decades=new Set(picks.map(p=>p.decade)).size;
  return`<div class="breakdown balancedBreakdown"><h3>${title} category grades</h3><p class="breakdownIntro">Overall grade is limited by the weakest category. To earn S, all six category averages must reach 91.</p><div class="categoryGradeGrid">${categoryBreakdown(picks)}</div><div class="breakdownSummary"><div class="breakMetric"><span>Balanced score</span><b>${balanced.toFixed(1)}</b></div><div class="breakMetric"><span>Average power</span><b>${avg.toFixed(1)}</b></div><div class="breakMetric"><span>Weakest</span><b>${weak.label} ${weak.score.toFixed(1)}</b></div></div><div class="breadthLine">${genres} genre${genres===1?"":"s"} · ${decades} decade${decades===1?"":"s"} · ${nextThresholdText(balanced)}</div></div>`;
};

// Refresh existing static rules copy after gameplay-v2 has already built the page.
(function applyFriendlierGradeCopy(){
  const grid=document.querySelector("#screen-rules .rulesGrid");
  if(grid){
    [...grid.querySelectorAll(".ruleBlock")].forEach(block=>{
      const h=block.querySelector("h3")?.textContent||"";
      const p=block.querySelector("p");
      if(!p)return;
      if(h==="Balanced scoring")p.textContent="The lineup is averaged separately for Live, Hits, Influence, Buzz, Critic and Catalog. The weakest category average becomes the Balanced Score.";
      if(h==="Overall grade")p.innerHTML="F &lt;60 · D 60 · C 68 · B 76 · A 82 · S 91+. A good run should now land in A; S still requires excellence in all six categories.";
    });
  }
  const side=document.querySelector("#screen-game .side .rules");
  if(side)side.innerHTML=`<b>Balanced scoring:</b> the <b>lowest of the six category averages</b> is your Balanced Score and determines the overall grade.<br><br><b>Friendlier thresholds:</b> F &lt;60 · D 60 · C 68 · B 76 · A 82 · <b>S 91+</b>. A good run should reach A; S still means every category cleared 91.<br><br><b>Rarity:</b> scarcity only. Card strength is global and era-specific.`;
})();
