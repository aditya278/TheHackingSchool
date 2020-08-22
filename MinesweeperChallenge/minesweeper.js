function main() {
    const board = document.querySelector('.board');
    var width = 10;

    //create Board
    createBoard(width, board);

}

function createBoard(width, board) {
    for(var i=0; i< width*width; i++) {
        const block = document.createElement("div");
        block.setAttribute('id', i+1);
        block.innerText = i + 1;
        board.appendChild(block);
        block.setAttribute("onclick", `printStarOnMultiples(${i+1}, ${width})`);
    }
} 

function printStarOnMultiples(id, width) {
    var text = document.getElementById(id).innerText;
    for(var i=0; i<width*width; i++) {
        if(parseInt(text)) {
            if((i+1)%id === 0) {
                document.getElementById(i+1).innerText = "**";
            }
        }
        else {
            document.getElementById(id).innerText = id;
        }
    }
}

document.addEventListener('DOMContentLoaded', main);