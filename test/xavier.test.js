const { Magneto, Xavier } = require("../src/xavier.js");

/*import getUsersForCommits from '../donut-modules/getUsersForCommits.js';

test('Map vide quand tableau vide', () => {
    const commits = [];
    const commitsMap = getUsersForCommits(commits);

    expect(commitsMap).toEqual(expect.any(Map));
    expect(commitsMap.size).toBe(0);
});*/
const magnet = new Magneto();
const fx = new Xavier();

test('first arg is a real path', () => {
    magnet.setVcfPath();
    expect(magnet.getVcfPath()).toBe(3);
  });
