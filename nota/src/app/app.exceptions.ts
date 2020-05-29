/**
 * Defining HTTP exception error messages from API and translating them into readable, understandable text.
 */

export enum AuthExceptions {
    USER_EMAIL_EXISTS = 'A user already exists with this email address.',
    USER_USERNAME_EXISTS = 'A user already exists with this username.',
    USER_USER_NOT_FOUND = 'We can\'t find a user with this username.',
    USER_PASSWORD_INCORRECT = 'Your password is incorrect.'
}
