export default (req: any, res: any, next: any) => {
    console.log("Hello World!");
    next();
}