#!/usr/bin/env node
import fs from 'fs';
import readline from 'readline';
import chalk from 'chalk';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`Whats the name of your ${chalk.blueBright('React-Component')}?\n`, answer => {
    fs.exists('./src', bool => {
        if(!bool) {
            console.log(chalk.redBright('\nThe src-folder doesn´t exist!'));
            process.exit(1);
        } else {
            fs.exists(`./src/sass/${answer}.sass`, bool => {
                if(bool) {
                    console.log(chalk.redBright('This component already exists. Choose another component name!'));
                    process.exit(1);
                } else {
                    fs.writeFile(`./src/components/${answer}.jsx`, `import React from 'react';
                    import '../sass/${answer}.sass';
                    
                    const ${answer} = () => {
                        return (
                            <div className='${answer.toLowerCase()}-container'>
                                <p>${answer}</p>
                            </div>
                        );
                    };
                    
                    export default ${answer};
                        `, err => '');
                    
                        fs.writeFile(`./src/sass/${answer}.sass`, '@import "design"', err => '');
                    
                        console.log('\n');
                        console.log(chalk.blueBright(`Succesfully create new ${answer} component!`));
                        process.exit(1);            
                }
            })
        
        }
    })
});

