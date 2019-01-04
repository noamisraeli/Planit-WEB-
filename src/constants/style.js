export const googleColors = {
    blue: "#4285f4",
    darkBlue: "rgb(42,86,198)"
}

export const splitterTitleHorizontal = "translate(-24px, -11px) rotate(90deg) scale(0.8)"
export const splitterWidth = 20;

export const queueStyle = {
    padding: "6px 0",
    height: 40,
    minWidth: "100%",
    borderBottom: "1px solid rgb(56, 54, 54)"
}

export const queueHeadersStyle = {
    float: "left",
    width: 100,
    height: "100%",
    backgroundColor: "#555",
    overflowX: "hidden",
}

export const queueHeaderStyle = {
    textAlign: "center",
    padding: "10px 0",
    borderBottom: "1px solid rgb(56, 54, 54)",
    borderRight: "1px solid rgb(56, 54, 54)",
    fontWeight: 600
}

export const ganttStyle = {
    width: "calc(" + 100 + "% - " + queueHeadersStyle.width + "px)"
}

export const viewHeaderStyle = {
    height: 30
}

export const selectedJobStyle = {
    backgroundColor: "gray"
}

export const draggedJobStyle = {
    display: "none"
}

export const jobStyle = {
    border: "1px solid black",
    borderRadius: "4px",
    height: "inherit",
    position: "relative",
    minWidth: "15px",
    width: "100%",
    boxShadow: "2px 4px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    cursor: "pointer"
}
export const operatorStyle = {
    padding: 3,
    cursor:"pointer",
    color: "#dfdfdf",
    height: "100%"
}