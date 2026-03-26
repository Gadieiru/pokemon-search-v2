import "../styles/message.css";

interface MessageProps {
  msg: string;
  type?: "error" | "info" | "success" | "warning";
  bgColor?: string; // Permitimos el color personalizado que envías desde Details
}

export const Message = ({ msg, type = "info", bgColor }: MessageProps) => {

  const containerStyle = bgColor
    ? { borderLeftColor: bgColor, backgroundColor: `${bgColor}22` }
    : {};

  return (
    <div 
      className={`pokemon-message-container ${type}`}
      style={containerStyle}
      role="alert"
    >
      <div className="pokemon-message-content">
        <p>{msg}</p>
      </div>
    </div>
  );
};
