
import React, { useEffect, useState } from "react";
import { getAllPlans } from "./CreatePlans"; // API file
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const ViewPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await getAllPlans(); 
      setPlans(response.plans || []); 
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPlan = (planId, employeeId) => {
    console.log(`Assigned plan ${planId} to employee ${employeeId}`);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Loading Plans...</Typography>
      </Box>
    );
  }

  if (!plans.length) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography>No plans available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9fafc", minHeight: "100vh" }}>


      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => {
          const discountedPrice = plan.price
            ? (
                plan.price -
                (plan.price * (plan.discountPercentage || 0)) / 100
              ).toFixed(0)
            : 0;

          return (
            <Grid item xs={12} md={6} lg={4} key={plan.id}>
              <Card
                sx={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  ":hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                  },
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #1976d2, #64b5f6)",
                    color: "white",
                    p: 2,
                    position: "relative",
                    textAlign: "center",
                  }}
                >
                  {plan.discountPercentage >= 30 && (
                    <Chip
                      icon={<StarIcon />}
                      label="Best Value"
                      color="warning"
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <Typography variant="h6" fontWeight="bold">
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" color="white">
                    Valid for {plan.durationInMonths} months
                  </Typography>
                </Box>

                {/* Content */}
                <CardContent sx={{ p: 3 }}>
                  <Stack alignItems="center" spacing={1.5}>
                    {/* Price Section */}
                    {plan.price === 0 ? (
                      <Typography
                        variant="h4"
                        color="success.main"
                        fontWeight="bold"
                      >
                        Free
                      </Typography>
                    ) : (
                      <>
                        <Typography variant="h4" color="primary" fontWeight="bold">
                          ₹{discountedPrice}
                        </Typography>
                        {plan.discountPercentage > 0 && (
                          <Typography
                            variant="body2"
                            color="error"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ₹{plan.price} ({plan.discountPercentage}% OFF)
                          </Typography>
                        )}
                      </>
                    )}

                    <Divider sx={{ width: "100%", my: 2 }} />

                    {/* Features */}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        textAlign="center"
                        mb={1}
                      >
                        Features:
                      </Typography>

                      {plan.features?.length ? (
                        <Stack spacing={1} alignItems="center">
                          {plan.features.map((feature, idx) => (
                            <Box
                              key={idx}
                              display="flex"
                              alignItems="center"
                              gap={1}
                            >
                              <CheckCircleIcon color="success" fontSize="small" />
                              <Typography variant="body2">{feature}</Typography>
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No features listed
                        </Typography>
                      )}
                    </Box>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 2 }}
                    >
                      Includes {plan.jobPostLimit} job posts
                    </Typography>

                    {/* Button */}
                    <Button
                      variant="contained"
                      color={plan.price === 0 ? "primary" : "success"}
                      fullWidth
                      sx={{
                        mt: 3,
                        py: 1.3,
                        borderRadius: "10px",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                      onClick={() => {
                        if (plan.price === 0) {
                          handleAssignPlan(plan.id, "new_employee_id");
                        } else {
                          handleAssignPlan(plan.id, "selected_employer_id");
                          navigate("/admin/fasthireadminlayout/employe", {
                            state: { plan },
                          });
                        }
                      }}
                    >
                      {plan.price === 0 ? "Start for Free" : "Buy Now"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ViewPlans;
