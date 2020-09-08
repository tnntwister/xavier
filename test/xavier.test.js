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


test('the vcf file path has the right extension', () => {
    magnet.setVcfPath();
    // test si le fichier fourni a une extension vcf
    expect(magnet.getVcfPath()).toMatch(/[.]vcf$/);;
  });

  test('the vcf file path isnt defined', () => {
    magnet.args = []
    expect(() => { magnet.setVcfPath() }).toThrow(Error);
  });

  test('the vcf file path is build', () => {
    magnet.buildVcfPath();
    expect(magnet.vcfPath).toMatch(/\.?\.?\/[^\r\n]+\/[a-z]{1,}\.vcf/);
  });
