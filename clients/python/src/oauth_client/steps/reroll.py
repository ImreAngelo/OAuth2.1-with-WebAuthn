from InquirerPy import inquirer
from InquirerPy.base.control import Choice

def reroll_values(text: str = "Choose an option..."):
    '''
    True = Reroll values

    False = Continue with existing values
    '''
    
    action = inquirer.select(
        message=text,
        choices=[
            Choice(value=True, name="Generate new values"),
            Choice(value=False, name="Open login page"),
            Choice(value=None, name="Exit"),
        ],
        default=True,
    ).execute()

    return action