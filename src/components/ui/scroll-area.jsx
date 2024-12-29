// src/components/ui/scroll-area.jsx
import PropTypes from "prop-types";
import { cn } from "@/lib/utils"; // Assuming you use a class merge utility like 'cn'

export function ScrollArea({ children, className, style }) {
  return (
    <div
      className={cn(
        "relative overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300",
        className
      )}
      style={{ maxHeight: "300px", ...style }} // Default max-height, can be customized
    >
      {children}
    </div>
  );
}

ScrollArea.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};
