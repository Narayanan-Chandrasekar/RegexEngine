

export class RegexEngine 
{
    public pattern: string; 
    public subPatterns;
    public anotherSubPatterns: string[];
    public subPattern: string;
    public length : number;
    public index: number;
    public specialCharacterCount;
    private MAX_SPECIAL_CHARACTER_COUNT = 2;
    
    constructor(pattern: string)
    {
        this.pattern = pattern;
        this.subPatterns= [];
        this.anotherSubPatterns= [];
        this.subPattern='';
        this.length = 0;
        this.index = 0;
        this.specialCharacterCount = 0;
    }

    public match()
    {
       let firstCharacter = this.readCharacter();
        if(this.isSpecialCharacter(firstCharacter))
        {
            throw Error('Invalid code');
        } else {
            this.length++;
            this.identifyPatterns();


        }
    }

    private readCharacter()
    {
        
        return this.pattern[this.index++];
    }

    isSpecialCharacter(char)
    {
        return char === '?' || char === '*'
    }

    identifyPatterns()
    {
        
       if(this.specialCharacterCount > this.MAX_SPECIAL_CHARACTER_COUNT)
       {
           throw Error("Invalid Code");
       }
       let nextCharacter = this.readCharacter();
       if(this.isSpecialCharacter(nextCharacter))
        {
            this.specialCharacterCount++;
            this.subPattern = this.subPattern + nextCharacter;
            this.identifyPatterns();
        } else {
            nextCharacter?this.length++:this.length;
            if(this.subPattern)
            {
                this.subPatterns.push(this.subPattern);
            }
                
                this.subPattern = '';
                this.specialCharacterCount = 0;
                if(this.index <= this.pattern.length)
                {
                    this.identifyPatterns();
                } else {
                    this.evaluatePatterns();
                }
          
        }
    }

    evaluatePatterns()
    {console.log("evaluate patterns")
        this.subPatterns.forEach((v, i, a)=>{this.anotherSubPatterns.push(v)});
        this.anotherSubPatterns.forEach((a, b , c)=>{console.log(a);
            switch(a)
            {
                case '?':
                    
                case '*':
                    console.log("Matched All Characters");
                    return;
                    
                case '*?':
                case '??':
                    console.log(this.length,"before");
                    this.length--;
                    console.log(this.length,"after");
                    break;
                default:
                    throw Error("Invalid pattern");
            }    
            console.log("outside switch");
        });
        this.length?console.log(`Matched ${this.length} characters`):console.log('Matched '+ (Number(this.length)+1) + ' character');
        
    }
    

    
}