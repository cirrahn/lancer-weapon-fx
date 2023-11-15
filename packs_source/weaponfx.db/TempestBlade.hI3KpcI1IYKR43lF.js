const {targetsMissed, targetTokens, sourceToken} = game.modules.get("lancer-weapon-fx").api.getMacroVariables(typeof messageId === "undefined" ? null : messageId, actor);

let sequence = new Sequence();

for (const target of targetTokens) {
    sequence.effect()
        .file("jb2a.melee_attack.01.magic_sword.yellow")
        .delay(500)
        .scaleToObject(6)
        .filter("ColorMatrix", {hue: 180})
        .atLocation(sourceToken)
        .moveTowards(target)
        .waitUntilFinished(-1000)
        .missed(targetsMissed.has(target.id));
    sequence.sound()
        .file("modules/lancer-weapon-fx/soundfx/Axe_swing.ogg")
        .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
        .waitUntilFinished(-1450);

        sequence.sound()
            .file("modules/lancer-weapon-fx/soundfx/Melee.ogg")
            .playIf(!targetsMissed.has(target.id))
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.7));
        sequence.effect()
            .file("jb2a.impact.blue.3")
            .playIf(!targetsMissed.has(target.id))
            .scaleToObject(2)
            .atLocation(target)
            .waitUntilFinished(-1200);
        sequence.effect()
            .file("jb2a.static_electricity.03")
            .playIf(!targetsMissed.has(target.id))
            .scaleToObject()
            .atLocation(target, {randomOffset: 0.8, gridUnits: true})
            .repeats(3, 75)
            .opacity(0.8)
            .waitUntilFinished(-1200);
}
sequence.play();