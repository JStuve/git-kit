import fs from 'fs';
import childProcess from 'child_process';

function getBuildVersion(): string | null {
    let version: string | null = null;

    try {
        const dataArray: any = JSON.parse(fs.readFileSync('./build/manifest.json', 'utf-8'));
        version = dataArray?.version ?? null;
    } catch (error) {
        console.error(error)
    }
    
    return version;
}


function zipBuildFiles(fileName: string): void {

    try {
        childProcess.execSync(`zip -r ./releases/${fileName}.zip ./build`)
    } catch(error) {
        console.error(error);
    }
}

function packageExtension(): void {
    const buildVersion: string | null = getBuildVersion();

    if(buildVersion === null) {
        console.log("Error: Unable to get build version")
    }

    zipBuildFiles(`git-kit-release-${buildVersion}`);

    console.log('Extension packaged:', buildVersion)
}

packageExtension();